import { Groq } from "groq-sdk";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: "GROQ_API_KEY is missing in .env" }, { status: 500 });
  }

  try {
    const { message } = await req.json();

    // Fetch context from DB
    const userGoal = await prisma.userGoal.findFirst();
    const exam = await prisma.exam.findFirst();
    const subjects = await prisma.subject.findMany();
    
    const context = `
      Current Student Status:
      - Goal: ${userGoal?.targetPackage || "Not Set"}, Progress: ${userGoal?.progress || 0}%
      - Next Exam: ${exam?.name || "None"} on ${exam?.targetDate ? exam.targetDate.toLocaleDateString() : "Not scheduled"}
      - Subjects: ${subjects.length > 0 ? subjects.map(s => `${s.name} (${s.completedTopics}/${s.totalTopics} topics)`).join(", ") : "No subjects loaded yet"}
    `;

    const prompt = `Context: ${context}\n\nUser Question: ${message}\n\nRespond as a helpful and encouraging academic manager. Keep the response concise and action-oriented.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const text = chatCompletion.choices[0]?.message?.content || "No response generated.";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
  }
}
