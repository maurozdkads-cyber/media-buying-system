-- CreateEnum
CREATE TYPE "InputStatus" AS ENUM ('inbox', 'triaged', 'converted');

-- CreateEnum
CREATE TYPE "InputType" AS ENUM ('tarea', 'hipotesis', 'dependencia', 'idea', 'urgencia');

-- CreateEnum
CREATE TYPE "Bucket" AS ENUM ('protect_profit', 'testing_operativo', 'rd_estrategico', 'pipeline_dependencias');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('hoy', 'esta_semana', 'backlog', 'estacionado');

-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('backlog', 'active', 'done', 'discarded');

-- CreateEnum
CREATE TYPE "TestResult" AS ENUM ('winner', 'loser', 'inconclusive');

-- CreateEnum
CREATE TYPE "NextStep" AS ENUM ('escalar', 'sostener', 'retestear', 'pedir_variante', 'archivar');

-- CreateEnum
CREATE TYPE "TestCategory" AS ENUM ('creativos', 'configuraciones', 'landing_pages', 'audiencias', 'copies_ctas');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('meta', 'tiktok', 'google', 'native');

-- CreateEnum
CREATE TYPE "Vertical" AS ENUM ('auto_insurance', 'glp1', 'debt_relief', 'aca');

-- CreateEnum
CREATE TYPE "Variant" AS ENUM ('A', 'B');

-- CreateEnum
CREATE TYPE "Confidence" AS ENUM ('high', 'medium', 'low');

-- CreateTable
CREATE TABLE "inputs" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT '',
    "date" TEXT NOT NULL,
    "context" TEXT NOT NULL DEFAULT '',
    "link" TEXT NOT NULL DEFAULT '',
    "status" "InputStatus" NOT NULL DEFAULT 'inbox',
    "type" "InputType",
    "bucket" "Bucket",
    "priority" "Priority",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tests" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "TestStatus" NOT NULL DEFAULT 'backlog',
    "hypothesis" TEXT NOT NULL DEFAULT '',
    "category" "TestCategory",
    "platform" "Platform",
    "vertical" "Vertical",
    "successMetric" TEXT NOT NULL DEFAULT '',
    "secondaryMetric" TEXT NOT NULL DEFAULT '',
    "victoryThreshold" TEXT NOT NULL DEFAULT '',
    "budget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "baseline" TEXT NOT NULL DEFAULT '',
    "controlledVariables" TEXT NOT NULL DEFAULT '',
    "result" "TestResult",
    "nextStep" "NextStep",
    "analysis" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3),
    "closeDate" TIMESTAMP(3),

    CONSTRAINT "tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracking_entries" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "variant" "Variant" NOT NULL,
    "date" TEXT NOT NULL,
    "spend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "primaryMetric" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "secondaryMetric" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tracking_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kb_entries" (
    "id" TEXT NOT NULL,
    "testId" TEXT,
    "title" TEXT NOT NULL,
    "category" "TestCategory" NOT NULL,
    "platform" "Platform",
    "vertical" "Vertical",
    "confidence" "Confidence" NOT NULL DEFAULT 'medium',
    "learning" TEXT NOT NULL DEFAULT '',
    "context" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kb_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_notes" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "activeItems" TEXT NOT NULL DEFAULT '',
    "decisions" TEXT NOT NULL DEFAULT '',
    "learnings" TEXT NOT NULL DEFAULT '',
    "staysEqual" TEXT NOT NULL DEFAULT '',
    "stops" TEXT NOT NULL DEFAULT '',
    "scales" TEXT NOT NULL DEFAULT '',
    "tomorrowProfitFocus" TEXT NOT NULL DEFAULT '',
    "tomorrowTestFocus" TEXT NOT NULL DEFAULT '',
    "tomorrowDependency" TEXT NOT NULL DEFAULT '',
    "tomorrowSuccessCriterion" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekly_plans" (
    "id" TEXT NOT NULL,
    "weekStart" TEXT NOT NULL,
    "weekFocus" TEXT NOT NULL DEFAULT '',
    "profitFocus" TEXT NOT NULL DEFAULT '',
    "strategicTest" TEXT NOT NULL DEFAULT '',
    "operationalLines" TEXT NOT NULL DEFAULT '',
    "dependencies" TEXT NOT NULL DEFAULT '',
    "doNotTouch" TEXT NOT NULL DEFAULT '',
    "tentativeSequence" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weekly_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_notes_date_key" ON "daily_notes"("date");

-- CreateIndex
CREATE UNIQUE INDEX "weekly_plans_weekStart_key" ON "weekly_plans"("weekStart");

-- AddForeignKey
ALTER TABLE "tracking_entries" ADD CONSTRAINT "tracking_entries_testId_fkey" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kb_entries" ADD CONSTRAINT "kb_entries_testId_fkey" FOREIGN KEY ("testId") REFERENCES "tests"("id") ON DELETE SET NULL ON UPDATE CASCADE;
