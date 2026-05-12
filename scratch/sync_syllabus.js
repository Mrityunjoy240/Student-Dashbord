const { PrismaClient } = require('@prisma/client');
const Groq = require('groq-sdk');
const fs = require('fs');
const pdf = require('pdf-parse-fork');

const prisma = new PrismaClient();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function sync() {
  console.log("🚀 Starting Master Syllabus Sync...");
  
  const dataBuffer = fs.readFileSync('c:/Users/ANAMIKA/DEV/Temp/dashbord/4th Sem_AIML (1).pdf');
  const data = await pdf(dataBuffer);
  const text = data.text;

  const blocks = text.split(/Course Name/i).slice(1);
  console.log(`Found ${blocks.length} subjects. Processing...`);

  const semanticMap = {
    "algorithms": "Design and Analysis of Algorithm",
    "algorithm": "Design and Analysis of Algorithm",
    "artificial intelligence": "AI, Ethics, Society",
    "ai ethics": "AI, Ethics, Society"
  };

  const colors = ["brand", "green", "orange", "yellow", "blue"];

  for (let i = 0; i < blocks.length; i++) {
    const blockText = "Course Name " + blocks[i];
    console.log(`Processing Subject ${i+1}/${blocks.length}...`);

    const prompt = `
      Analyze this syllabus block and extract EVERY module and topic.
      STRICT RULES:
      1. Extract Course Name EXACTLY.
      2. Extract ALL modules (1-6).
      3. For EVERY module, list EVERY topic bullet point.
      4. IGNORE tables like CO-PO, Evaluation.
      5. Return ONLY JSON: { "name": "...", "difficulty": "...", "modules": [{ "title": "...", "topics": ["..."] }] }
      
      Block:
      ${blockText.substring(0, 15000)}
    `;

    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const s = JSON.parse(response.choices[0].message.content || "{}");
    if (!s.name) continue;

    let finalName = s.name.trim();
    if (semanticMap[finalName.toLowerCase()]) finalName = semanticMap[finalName.toLowerCase()];

    console.log(`Synced: ${finalName} (${s.modules?.length || 0} modules)`);

    // Use transaction to ensure consistency
    await prisma.$transaction(async (tx) => {
      let subject = await tx.subject.findFirst({
        where: { name: { contains: finalName.split(' ')[0] } }
      });

      if (!subject) {
        subject = await tx.subject.create({
          data: {
            name: finalName,
            difficulty: s.difficulty || "Medium",
            totalTopics: 0,
            completedTopics: 0,
            color: colors[i % colors.length]
          }
        });
      }

      if (s.modules) {
        for (const m of s.modules) {
          for (const topicTitle of (m.topics || [])) {
            const normalized = topicTitle.trim();
            const existing = await tx.task.findFirst({
              where: { title: normalized, subjectId: subject.id }
            });
            if (!existing) {
              await tx.task.create({
                data: {
                  title: normalized,
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

      const count = await tx.task.count({ where: { subjectId: subject.id } });
      await tx.subject.update({ where: { id: subject.id }, data: { totalTopics: count } });
    });
  }

  console.log("✅ Master Sync Complete!");
}

sync()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
