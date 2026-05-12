import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.task.deleteMany()
  await prisma.subject.deleteMany()
  await prisma.event.deleteMany()
  await prisma.exam.deleteMany()
  await prisma.userGoal.deleteMany()

  // Seed User Goal
  await prisma.userGoal.create({
    data: {
      targetPackage: "15-20 LPA Package",
      targetRole: "Full Stack Developer",
      progress: 42,
      targetDate: new Date("2026-12-31T23:59:59Z"),
      roadmap: JSON.stringify({
        milestones: [
          { month: "June", task: "Master React & Next.js", details: "Build 3 full-stack projects using App Router and Server Actions." },
          { month: "July", task: "Advanced DSA", details: "Solve 100+ LeetCode Medium/Hard problems on Graphs and Dynamic Programming." },
          { month: "August", task: "System Design Basics", details: "Learn about Load Balancers, Caching, and Database Sharding." },
          { month: "September", task: "Internship Applications", details: "Optimize portfolio and start applying for winter internships." }
        ]
      })
    },
  })

  // Seed Exam
  await prisma.exam.create({
    data: {
      name: "Final Semester Exams",
      targetDate: new Date("2026-11-15T09:00:00Z"),
    },
  })

  // Seed Subjects
  const ds = await prisma.subject.create({
    data: {
      name: "Data Structures",
      difficulty: "Medium",
      totalTopics: 30,
      completedTopics: 18,
      color: "brand",
    },
  })

  const dbms = await prisma.subject.create({
    data: {
      name: "Database Management",
      difficulty: "Medium",
      totalTopics: 20,
      completedTopics: 9,
      color: "green",
    },
  })

  const os = await prisma.subject.create({
    data: {
      name: "Operating Systems",
      difficulty: "Hard",
      totalTopics: 20,
      completedTopics: 6,
      color: "orange",
    },
  })

  const cn = await prisma.subject.create({
    data: {
      name: "Computer Networks",
      difficulty: "Medium",
      totalTopics: 20,
      completedTopics: 10,
      color: "yellow",
    },
  })

  const ml = await prisma.subject.create({
    data: {
      name: "Machine Learning",
      difficulty: "Hard",
      totalTopics: 20,
      completedTopics: 5,
      color: "blue",
    },
  })

  // Seed Events
  await prisma.event.createMany({
    data: [
      { title: "DBMS Assignment", type: "Assignment", date: new Date("2025-04-15"), color: "green" },
      { title: "OS Quiz", type: "Assignment", date: new Date("2025-04-18"), color: "orange" },
      { title: "DSA Contest", type: "Study Plan", date: new Date("2025-04-20"), color: "brand" },
      { title: "End Sem Exam", type: "Exam", date: new Date("2025-06-10"), color: "red" },
    ],
  })

  // Seed Tasks
  await prisma.task.createMany({
    data: [
      { title: "DBMS - Normalization (Topic 3)", isCompleted: true, category: "DBMS", subjectId: dbms.id },
      { title: "DSA - Arrays Practice", isCompleted: true, category: "DSA", subjectId: ds.id },
      { title: "OS - Process Scheduling", isCompleted: false, category: "OS", subjectId: os.id },
      { title: "ML - Linear Regression", isCompleted: false, category: "ML", subjectId: ml.id },
      { title: "Read Notes - CN", isCompleted: true, category: "CN", subjectId: cn.id },
      { title: "Solve Previous Year Paper", isCompleted: false, category: "EXAM" },
    ],
  })

  console.log('Seed data created successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
