const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanup() {
  console.log("Starting Database Cleanup...");
  
  const subjects = await prisma.subject.findMany({
    include: { tasks: true }
  });

  const merged = new Set();
  
  for (let i = 0; i < subjects.length; i++) {
    if (merged.has(subjects[i].id)) continue;
    
    const s1 = subjects[i];
    const name1 = s1.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    for (let j = i + 1; j < subjects.length; j++) {
      if (merged.has(subjects[j].id)) continue;
      
      const s2 = subjects[j];
      const name2 = s2.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      // Simple semantic check: if one name contains the other or they share major keywords
      const words1 = s1.name.toLowerCase().split(/[\s,]+/).filter(w => w.length > 3);
      const words2 = s2.name.toLowerCase().split(/[\s,]+/).filter(w => w.length > 3);
      
      const commonWords = words1.filter(w => words2.includes(w));
      const isMatch = name1.includes(name2) || name2.includes(name1) || commonWords.length >= 2;

      if (isMatch) {
        console.log(`Merging "${s2.name}" into "${s1.name}"...`);
        
        // Move all tasks from s2 to s1
        for (const task of s2.tasks) {
          // Avoid duplicate tasks
          const existingTask = await prisma.task.findFirst({
            where: {
              subjectId: s1.id,
              title: task.title,
              module: task.module
            }
          });
          
          if (!existingTask) {
            await prisma.task.update({
              where: { id: task.id },
              data: { subjectId: s1.id }
            });
          } else {
            // Task already exists in s1, just delete the duplicate from s2
            await prisma.task.delete({ where: { id: task.id } });
          }
        }
        
        // Delete the duplicate subject
        await prisma.subject.delete({ where: { id: s2.id } });
        merged.add(s2.id);
      }
    }
    
    // Update the final subject's total topics
    const actualTaskCount = await prisma.task.count({
      where: { subjectId: s1.id }
    });
    await prisma.subject.update({
      where: { id: s1.id },
      data: { totalTopics: actualTaskCount }
    });
  }
  
  console.log("Cleanup Complete!");
}

cleanup()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
