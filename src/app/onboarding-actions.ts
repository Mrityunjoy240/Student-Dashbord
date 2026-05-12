"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Groq from "groq-sdk";

export async function saveUserOnboarding(data: {
  currentYear: string;
  branch: string;
  currentSkills: string;
  targetPackage: string;
  targetRole: string;
  targetDate: string;
}) {
  try {
    const goal = await prisma.userGoal.findFirst();
    
    const updateData = {
      currentYear: data.currentYear,
      branch: data.branch,
      currentSkills: data.currentSkills,
      targetPackage: data.targetPackage,
      targetRole: data.targetRole,
      targetDate: new Date(data.targetDate),
    };

    let userGoal;
    if (goal) {
      userGoal = await prisma.userGoal.update({
        where: { id: goal.id },
        data: updateData,
      });
    } else {
      userGoal = await prisma.userGoal.create({
        data: { ...updateData, progress: 0 },
      });
    }

    // Generate Roadmap using Groq
    await generateRoadmapAction(userGoal.id);

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Onboarding Save Error:", error);
    return { success: false, error: error.message };
  }
}

export async function generateRoadmapAction(goalId: string) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return;

  try {
    const goal = await prisma.userGoal.findUnique({ where: { id: goalId } });
    if (!goal) return;

    const groq = new Groq({ apiKey });

    const prompt = `
      You are a senior career coach. Create a detailed monthly roadmap for a student with the following profile:
      - Current Year: ${goal.currentYear}
      - Branch: ${goal.branch}
      - Current Skills: ${goal.currentSkills}
      - Target Role: ${goal.targetRole}
      - Target Package: ${goal.targetPackage}
      - Target Date: ${goal.targetDate.toLocaleDateString()}
      
      SPECIFIC REQUIREMENTS:
      - Goal is a 15 LPA+ job by 4th year.
      - Must include at least 2 Data Science internships or 1 AI internship before graduation.
      - The roadmap should be aggressive and realistic.

      Return ONLY a JSON object.
      Format:
      {
        "milestones": [
          { "month": "Month 1", "task": "Learn X", "details": "Focus on Y" },
          { "month": "Month 2", "task": "Project Z", "details": "Build A, B" }
        ]
      }
    `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const roadmapJson = completion.choices[0]?.message?.content;
    if (roadmapJson) {
      const roadmapData = JSON.parse(roadmapJson);
      
      // Update Goal with Roadmap JSON
      await prisma.userGoal.update({
        where: { id: goalId },
        data: { roadmap: roadmapJson },
      });

      // Create Actionable Tasks for each milestone
      if (roadmapData.milestones) {
        await prisma.task.deleteMany({ where: { category: "ROADMAP" } }); // Clear old roadmap tasks
        
        await prisma.task.createMany({
          data: roadmapData.milestones.map((m: any, index: number) => ({
            title: `Roadmap: ${m.task}`,
            isCompleted: false,
            category: "ROADMAP",
            milestoneIndex: index
          }))
        });
      }
    }
  } catch (error) {
    console.error("Roadmap Generation Error:", error);
  }
}
