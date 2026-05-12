-- CreateTable
CREATE TABLE "UserGoal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "targetPackage" TEXT NOT NULL,
    "targetDate" DATETIME NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "targetDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "totalTopics" INTEGER NOT NULL,
    "completedTopics" INTEGER NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT NOT NULL,
    "subjectId" TEXT,
    CONSTRAINT "Task_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
