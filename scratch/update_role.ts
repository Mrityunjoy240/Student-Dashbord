import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const userGoal = await prisma.userGoal.findFirst();
  if (userGoal) {
    await prisma.userGoal.update({
      where: { id: userGoal.id },
      data: { 
        targetRole: "AI/ML Engineer",
        targetPackage: "15 LPA Package"
      }
    });
    console.log("Goal updated!");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
