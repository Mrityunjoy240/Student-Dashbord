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
    console.log(`[SYLLABUS] Processing file: ${file.name}`);
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const pdfData = await pdf(buffer);
    const extractedText = pdfData.text;

    if (!extractedText || extractedText.trim().length < 50) {
      return { success: false, error: "Insufficient text extracted from PDF. Please ensure it is not a scanned image." };
    }

    const groq = new Groq({ apiKey });

    // Split text into individual course blocks
    const blocks = extractedText.split(/Course Name/i).slice(1);
    console.log(`[SYLLABUS] Identified ${blocks.length} potential course sections.`);

    const semanticMap: Record<string, string> = {
      "algorithms": "Design and Analysis of Algorithm",
      "algorithm": "Design and Analysis of Algorithm",
      "artificial intelligence": "AI, Ethics, Society",
      "ai ethics": "AI, Ethics, Society",
      "ai": "AI, Ethics, Society"
    };

    const colors = ["brand", "green", "orange", "blue"];

    for (let blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
      const blockText = "Course Name " + blocks[blockIdx];
      
      const prompt = `
        You are an elite academic architect. Analyze this course syllabus block and extract EVERY module and topic.
        
        STRICT PROTOCOL:
        1. "Course Name": Extract the EXACT full name.
        2. "Course Modules": Identify the primary structural units (typically Modules 1-6).
        3. "Topics": For EVERY module, list EVERY educational topic bullet point.
        4. IGNORE: Non-educational content like CO-PO tables, evaluation schemes, or reference books.
        5. OUTPUT: Return ONLY a valid JSON object.
        
        STRUCTURE:
        {
          "name": "Full Subject Name",
          "difficulty": "Easy" | "Medium" | "Hard",
          "modules": [
            { "title": "Module X: Title", "topics": ["Topic A", "Topic B"] }
          ]
        }
        
        SYLLABUS DATA:
        ${blockText.substring(0, 15000)}
      `;

      try {
        const response = await groq.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "llama-3.3-70b-versatile",
          temperature: 0.1,
          response_format: { type: "json_object" },
        });

        const s = JSON.parse(response.choices[0].message.content || "{}");
        if (!s.name) {
          console.warn(`[SYLLABUS] Block ${blockIdx} failed to yield a valid subject name. Skipping.`);
          continue;
        }

        const lowerName = s.name.trim().toLowerCase();
        let finalName = s.name.trim();
        if (semanticMap[lowerName]) {
          finalName = semanticMap[lowerName];
        }

        console.log(`[SYLLABUS] Synchronizing: ${finalName}`);

        await prisma.$transaction(async (tx) => {
          let subject = await tx.subject.findFirst({
            where: { 
              OR: [
                { name: { equals: finalName } },
                { name: { startsWith: finalName.split(' ')[0] } }
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
                        subjectId: subject.id,
                        priority: s.difficulty === "Hard" ? "High" : "Medium"
                      }
                    });
                  }
                }
              }
            }
          }

          // Force sync counts
          const totalCount = await tx.task.count({ where: { subjectId: subject.id } });
          const completedCount = await tx.task.count({ where: { subjectId: subject.id, isCompleted: true } });
          
          await tx.subject.update({
            where: { id: subject.id },
            data: { totalTopics: totalCount, completedTopics: completedCount }
          });
        });
      } catch (innerError) {
        console.error(`[SYLLABUS] Failed to process block ${blockIdx}:`, innerError);
      }
    }

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("[SYLLABUS] Critical Failure:", error);
    return { success: false, error: error.message || "An unexpected error occurred during synchronization." };
  }
}

export async function toggleTask(id: string, isCompleted: boolean) {
  try {
    const targetTask = await prisma.task.findUnique({ where: { id } });
    if (!targetTask) return;

    // Batch update related tasks (e.g., if duplicated across views)
    const tasksToUpdate = await prisma.task.findMany({
      where: { 
        OR: [
          { id: id },
          { title: targetTask.title, subjectId: targetTask.subjectId }
        ]
      }
    });

    await prisma.$transaction(tasksToUpdate.map(t => 
      prisma.task.update({
        where: { id: t.id },
        data: { isCompleted }
      })
    ));

    // Update subject progress
    if (targetTask.subjectId) {
      const completedCount = await prisma.task.count({
        where: { subjectId: targetTask.subjectId, isCompleted: true }
      });
      
      await prisma.subject.update({
        where: { id: targetTask.subjectId },
        data: { completedTopics: completedCount }
      });
    }

    // Global goal update
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
  } catch (error) {
    console.error("[ACTION] Failed to toggle task state:", error);
  }
}

export async function updateGoal(targetPackage: string, targetDate: Date, targetRole?: string, branch?: string) {
  const goal = await prisma.userGoal.findFirst();
  if (goal) {
    await prisma.userGoal.update({
      where: { id: goal.id },
      data: { targetPackage, targetDate, targetRole, branch },
    });
  } else {
    await prisma.userGoal.create({
      data: { targetPackage, targetDate, targetRole, branch, progress: 0 },
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

