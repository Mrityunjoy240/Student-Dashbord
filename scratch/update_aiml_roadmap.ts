import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const roadmapData = {
    semesters: [
      {
        term: "Semester 4 (Current)",
        focus: "Foundation & First Move",
        milestones: [
          {
            title: "Core AI/ML Foundations",
            details: "Learn Python (Pandas/sklearn), SQL (Window functions), Math (Distributions, Bayes), and ML from scratch (Linear/Logistic regression).",
            resources: [
              { name: "StatQuest (Math)", url: "https://www.youtube.com/@statquest" },
              { name: "3Blue1Brown", url: "https://www.youtube.com/c/3blue1brown" },
              { name: "Andrew Ng ML", url: "https://www.coursera.org/specializations/machine-learning-introduction" }
            ]
          },
          {
            title: "First Real-World Project",
            details: "Build 1 end-to-end project (data cleaning → modeling → evaluation → deployment) using real datasets. Not toy problems. Deploy on Vercel/Railway.",
            resources: [
              { name: "Kaggle Datasets", url: "https://www.kaggle.com/datasets" },
              { name: "Vercel Docs", url: "https://vercel.com/docs" }
            ]
          },
          {
            title: "Competitive Work & Git",
            details: "Reach Kaggle Contributor tier. Maintain daily commits: 5+ public repos, 50+ commits this semester. Participate in 1 hackathon.",
            resources: [
              { name: "Kaggle", url: "https://www.kaggle.com/" },
              { name: "Devpost Hackathons", url: "https://devpost.com/" }
            ]
          }
        ]
      },
      {
        term: "Semester 5",
        focus: "First Internship & Applied Skills",
        milestones: [
          {
            title: "Secure AI/ML Internship",
            details: "Target Series A-B startups/product companies. Skip IT services. Use cold outreach/DMs to founders 6-8 weeks before semester.",
            resources: [
              { name: "Wellfound", url: "https://wellfound.com/" },
              { name: "LinkedIn", url: "https://www.linkedin.com/" }
            ]
          },
          {
            title: "Cloud & Dashboarding",
            details: "Learn GCP or AWS free tier. Build and deploy 1 interactive dashboard using Streamlit or Tableau.",
            resources: [
              { name: "Streamlit", url: "https://streamlit.io/" },
              { name: "AWS Free Tier", url: "https://aws.amazon.com/free/" }
            ]
          },
          {
            title: "A/B Testing & Networking",
            details: "Learn experiment design. Build 10-15 meaningful LinkedIn connections from the internship.",
            resources: [
              { name: "Reforge A/B Testing", url: "https://www.reforge.com/" }
            ]
          }
        ]
      },
      {
        term: "Semester 6",
        focus: "Specialization & Production Portfolio",
        milestones: [
          {
            title: "Deep Specialization",
            details: "Choose Lane A (MLOps: PyTorch, Docker, CI/CD), Lane B (Data Science: Advanced SQL, dbt), or Lane C (NLP: RAG, LangChain).",
            resources: [
              { name: "Made With ML", url: "https://madewithml.com/" },
              { name: "Hugging Face Course", url: "https://huggingface.co/learn/nlp-course/chapter1/1" }
            ]
          },
          {
            title: "Production Portfolio Project",
            details: "Build a 500+ line production-grade system (e.g., FastAPI backend + Docker + CI/CD or working RAG system). Polish over 2-3 weeks.",
            resources: [
              { name: "FastAPI", url: "https://fastapi.tiangolo.com/" },
              { name: "Docker Docs", url: "https://docs.docker.com/" }
            ]
          },
          {
            title: "Build Public Proof",
            details: "Get 50+ GitHub stars or write 1 viral technical blog post (Medium/Dev.to) about your production project.",
            resources: [
              { name: "Dev.to", url: "https://dev.to/" }
            ]
          }
        ]
      },
      {
        term: "Semester 7",
        focus: "Second Internship & Interview Prep",
        milestones: [
          {
            title: "High-Impact Internship (PPO)",
            details: "Target Sarvam AI, Zepto, CRED, or MNCs. Aim for real impact leading to a Pre-Placement Offer (PPO).",
            resources: []
          },
          {
            title: "Intense Interview Prep",
            details: "Solve 150-200 LeetCode Mediums. Do 10+ mock interviews. Derive gradient descent & explain tradeoffs.",
            resources: [
              { name: "Neetcode.io", url: "https://neetcode.io/" },
              { name: "Chip Huyen ML Interviews", url: "https://huyenchip.com/ml-interviews-book/" }
            ]
          },
          {
            title: "Expand Network to 100+",
            details: "Build 100+ meaningful LinkedIn connections. Participate in a top 5% Kaggle competition.",
            resources: []
          }
        ]
      },
      {
        term: "Semester 8",
        focus: "Final Push & Placements",
        milestones: [
          {
            title: "Placement Interviews",
            details: "Clear coding rounds, ML design rounds (architecture, tradeoffs), and real ML take-homes (evaluated on code quality).",
            resources: []
          },
          {
            title: "Negotiation & Leverage",
            details: "Leverage competing offers, GitHub stars, hackathons, and PPOs. Ask for 15 LPA base + stock.",
            resources: []
          },
          {
            title: "15 LPA AI/ML Job Offer",
            details: "Secure the bag. PPO from Sem 7 (60% chance) or Referral from network (30% chance).",
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
    console.log("AIML Roadmap updated successfully!");
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
