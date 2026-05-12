"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import pdf from "pdf-parse-fork";
import Groq from "groq-sdk";

export async function uploadSyllabus(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "No file uploaded" };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { success: false, error: "GROQ_API_KEY is missing in .env" };
  }

  try {
    console.log(`Processing file with Groq: ${file.name}`);
    
    // 1. Extract Text from PDF using pdf-parse-fork (more stable in Next.js)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const pdfData = await pdf(buffer);
    const extractedText = pdfData.text;

    if (!extractedText || extractedText.trim().length < 50) {
      return { success: false, error: "Could not extract enough text from the PDF. Is it a scanned image?" };
    }

    // 2. Send Text to Groq
    const groq = new Groq({ apiKey });

    // 1. Split text into individual course blocks using "Course Name" as the delimiter
    const blocks = extractedText.split(/Course Name/i).slice(1);
    console.log(`Found ${blocks.length} potential course blocks.`);

    const semanticMap: Record<string, string> = {
      "algorithms": "Design and Analysis of Algorithm",
      "algorithm": "Design and Analysis of Algorithm",
      "artificial intelligence": "AI, Ethics, Society",
      "ai ethics": "AI, Ethics, Society",
      "ai": "AI, Ethics, Society"
    };

    const colors = ["brand", "green", "orange", "yellow", "blue"];

    for (let blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
      const blockText = "Course Name " + blocks[blockIdx];
      
      const prompt = `
        Analyze this single course syllabus block and extract EVERY module and topic.
        
        STRICT RULES:
        1. Extract the "Course Name" EXACTLY.
        2. Find the "Course Modules" section. 
        3. You must extract ALL modules (typically 1 through 6). DO NOT STOP after the first few.
        4. For EVERY module, list EVERY topic bullet point.
        5. IGNORE non-educational tables (CO-PO, Evaluation).
        6. Return ONLY a JSON object.
        
        Format:
        {
          "name": "Exact Subject Name",
          "difficulty": "Easy/Medium/Hard",
          "modules": [
            { "title": "Module 1 Title", "topics": ["Topic 1", "Topic 2"] },
            { "title": "Module 2 Title", "topics": ["Topic 3", "Topic 4"] }
            ... and so on for ALL modules ...
          ]
        }
        
        Block Text:
        ${blockText.substring(0, 15000)}
      `;

      const response = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        response_format: { type: "json_object" },
      });

      const s = JSON.parse(response.choices[0].message.content || "{}");
      if (!s.name) continue;

      // Apply Semantic Mapping
      const lowerName = s.name.trim().toLowerCase();
      let finalName = s.name.trim();
      if (semanticMap[lowerName]) {
        finalName = semanticMap[lowerName];
      }

      await prisma.$transaction(async (tx) => {
        // Smart Merge
        let subject = await tx.subject.findFirst({
          where: { 
            OR: [
              { name: { equals: finalName } },
              { name: { contains: finalName.split(' ')[0] } } // Loose match for first word
            ]
          }
        });

        if (!subject) {
          subject = await tx.subject.create({
            data: {
              name: finalName,
              difficulty: s.difficulty || "Medium",
              totalTopics: 0,
              completedTopics: 0,
              color: colors[blockIdx % colors.length],
            },
          });
        }

        if (s.modules) {
          for (const m of s.modules) {
            if (m.topics) {
              for (const topicTitle of m.topics) {
                const normalizedTopic = topicTitle.trim();
                const existing = await tx.task.findFirst({
                  where: { title: normalizedTopic, subjectId: subject.id }
                });
                if (!existing) {
                  await tx.task.create({
                    data: {
                      title: normalizedTopic,
                      module: m.title,
                      isCompleted: false,
                      category: finalName.substring(0, 10).toUpperCase(),
                      subjectId: subject.id
                    }
                  });
                }
              }
            }
          }
        }

        // Recalculate
        const count = await tx.task.count({ where: { subjectId: subject.id } });
        await tx.subject.update({
          where: { id: subject.id },
          data: { totalTopics: count }
        });
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Groq Syllabus Parsing Error:", error);
    return { 
      success: false, 
      error: error.message || "An error occurred while processing the PDF" 
    };
  }
}

export async function toggleTask(id: string, isCompleted: boolean) {
  const targetTask = await prisma.task.findUnique({ where: { id } });
  if (!targetTask) return;

  const tasksToUpdate = await prisma.task.findMany({
    where: { 
      OR: [
        { id: id },
        { title: targetTask.title },
        { title: targetTask.title.replace("Roadmap: ", "") },
        { title: `Roadmap: ${targetTask.title}` }
      ]
    }
  });

  const updatedTasks = await Promise.all(tasksToUpdate.map(t => 
    prisma.task.update({
      where: { id: t.id },
      data: { isCompleted },
      include: { subject: true }
    })
  ));

  const subjectIds = Array.from(new Set(updatedTasks.map(t => t.subjectId).filter(Boolean))) as string[];
  for (const sId of subjectIds) {
    const completedCount = await prisma.task.count({
      where: { subjectId: sId, isCompleted: true }
    });
    
    await prisma.subject.update({
      where: { id: sId },
      data: { completedTopics: completedCount }
    });
  }

  const totalTasks = await prisma.task.count();
  const totalCompleted = await prisma.task.count({ where: { isCompleted: true } });
  const progress = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
  
  const goal = await prisma.userGoal.findFirst();
  if (goal) {
    await prisma.userGoal.update({
      where: { id: goal.id },
      data: { progress }
    });
  }

  revalidatePath("/");
}

export async function updateGoal(targetPackage: string, targetDate: Date) {
  const goal = await prisma.userGoal.findFirst();
  if (goal) {
    await prisma.userGoal.update({
      where: { id: goal.id },
      data: { targetPackage, targetDate },
    });
  } else {
    await prisma.userGoal.create({
      data: { targetPackage, targetDate, progress: 0 },
    });
  }
  revalidatePath("/");
}

export async function updateExam(name: string, targetDate: Date) {
  const exam = await prisma.exam.findFirst();
  if (exam) {
    await prisma.exam.update({
      where: { id: exam.id },
      data: { name, targetDate },
    });
  } else {
    await prisma.exam.create({
      data: { name, targetDate },
    });
  }
  revalidatePath("/");
}

export async function addEvent(title: string, type: string, date: Date, color: string) {
  await prisma.event.create({
    data: { title, type, date, color },
  });
  revalidatePath("/");
}

export async function updateTaskPriority(id: string, priority: string) {
  await prisma.task.update({
    where: { id },
    data: { priority },
  });
  revalidatePath("/");
}

export async function updateTaskDueDate(id: string, dueDate: Date | null) {
  await prisma.task.update({
    where: { id },
    data: { dueDate },
  });
  revalidatePath("/");
}

export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: { id },
  });
  revalidatePath("/");
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({
    where: { id },
  });
  revalidatePath("/");
}
