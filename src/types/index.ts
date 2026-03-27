// Input types
export type InputType = "tarea" | "hipotesis" | "dependencia" | "idea" | "urgencia";
export type Bucket = "protect_profit" | "testing_operativo" | "rd_estrategico" | "pipeline_dependencias";
export type Priority = "hoy" | "esta_semana" | "backlog" | "estacionado";
export type InputStatus = "inbox" | "triaged" | "converted";

export interface Input {
  id: string;
  text: string;
  source: string;
  date: string;
  context: string;
  link: string;
  status: InputStatus;
  type: InputType | null;
  bucket: Bucket | null;
  priority: Priority | null;
  createdAt: string;
}

// Test types
export type TestStatus = "backlog" | "active" | "done" | "discarded";
export type TestResult = "winner" | "loser" | "inconclusive" | null;
export type NextStep = "escalar" | "sostener" | "retestear" | "pedir_variante" | "archivar" | null;
export type TestCategory = "creativos" | "configuraciones" | "landing_pages" | "audiencias" | "copies_ctas";
export type Platform = "meta" | "tiktok" | "google" | "native";
export type Vertical = "auto_insurance" | "glp1" | "debt_relief" | "aca";

export interface Test {
  id: string;
  title: string;
  status: TestStatus;
  hypothesis: string;
  category: TestCategory;
  platform: Platform;
  vertical: Vertical;
  successMetric: string;
  secondaryMetric: string;
  victoryThreshold: string;
  budget: number;
  duration: number;
  baseline: string;
  controlledVariables: string;
  result: TestResult;
  nextStep: NextStep;
  analysis: string;
  createdAt: string;
  startDate: string | null;
  closeDate: string | null;
  trackingEntries: TrackingEntry[];
}

// Tracking types
export type Variant = "A" | "B";

export interface TrackingEntry {
  id: string;
  testId: string;
  variant: Variant;
  date: string;
  spend: number;
  primaryMetric: number;
  secondaryMetric: number;
  notes: string;
}

// Knowledge Base types
export type Confidence = "high" | "medium" | "low";
export type KBCategory = "audiencias" | "configuraciones" | "creativos" | "copies_ctas" | "landing_pages";

export interface KBEntry {
  id: string;
  testId: string | null;
  title: string;
  category: KBCategory;
  platform: Platform;
  vertical: Vertical;
  confidence: Confidence;
  learning: string;
  context: string;
  createdAt: string;
}

// Daily Note types
export interface DailyNote {
  id: string;
  date: string;
  activeItems: string;
  decisions: string;
  learnings: string;
  staysEqual: string;
  stops: string;
  scales: string;
  tomorrowProfitFocus: string;
  tomorrowTestFocus: string;
  tomorrowDependency: string;
  tomorrowSuccessCriterion: string;
}

// Weekly Plan types
export interface WeeklyPlan {
  id: string;
  weekStart: string;
  weekFocus: string;
  profitFocus: string;
  strategicTest: string;
  operationalLines: string;
  dependencies: string;
  doNotTouch: string;
  tentativeSequence: string;
}

// UI types
export type ViewMode = "kanban" | "table";
export type SidebarSection = "dashboard" | "inbox" | "triage" | "tests" | "kb";
