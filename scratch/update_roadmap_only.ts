import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const roadmapData = {
    semesters: [
      {
        term: "Semester 5 (Current)",
        focus: "Core CS & Advanced DSA",
        milestones: [
          {
            title: "Master Advanced DSA",
            details: "Solve 100+ LeetCode Medium/Hard problems focusing on Graphs, Trees, and Dynamic Programming.",
            resources: [
              { name: "LeetCode 75", url: "https://leetcode.com/study-plan/leetcode-75/" },
              { name: "NeetCode Roadmap", url: "https://neetcode.io/roadmap" }
            ]
          },
          {
            title: "Operating Systems Deep Dive",
            details: "Understand concurrency, memory management, and file systems. Essential for backend interviews.",
            resources: [
              { name: "NPTEL OS Course", url: "https://nptel.ac.in/" }
            ]
          },
          {
            title: "First Portfolio Project",
            details: "Build a full-stack web application (MERN or Next.js) with real user authentication and database.",
            resources: [
              { name: "Full Stack Open", url: "https://fullstackopen.com/en/" }
            ]
          }
        ]
      },
      {
        term: "Semester 6",
        focus: "System Design & Internships",
        milestones: [
          {
            title: "System Design Basics",
            details: "Learn Load Balancers, Caching, Database Sharding, and Microservices.",
            resources: [
              { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" }
            ]
          },
          {
            title: "Apply for Summer Internships",
            details: "Optimize resume and LinkedIn. Reach out to alumni for referrals. Target 50+ applications.",
            resources: [
              { name: "Resume Best Practices", url: "#" }
            ]
          },
          {
            title: "Hackathons & Open Source",
            details: "Participate in at least 2 hackathons and contribute to 1 open-source project to build your network.",
            resources: [
              { name: "Devpost", url: "https://devpost.com/" }
            ]
          }
        ]
      },
      {
        term: "Semester 7",
        focus: "Specialization & Placements",
        milestones: [
          {
            title: "Mock Interviews",
            details: "Conduct weekly mock interviews with peers. Focus on communication and problem-solving under pressure.",
            resources: [
              { name: "Pramp", url: "https://www.pramp.com/" }
            ]
          },
          {
            title: "Capstone Project",
            details: "Build a highly scalable project solving a real-world problem. Deploy it using AWS/GCP.",
            resources: []
          },
          {
            title: "Campus Placements",
            details: "Sit for companies. Aim for PPO (Pre-Placement Offer) if internship was successful.",
            resources: []
          }
        ]
      }
    ]
  };

  const userGoal = await prisma.userGoal.findFirst();
  if (userGoal) {
    await prisma.userGoal.update({
      where: { id: userGoal.id },
      data: { roadmap: JSON.stringify(roadmapData) }
    });
    console.log("Roadmap updated successfully!");
  } else {
    console.log("No UserGoal found.");
  }
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
