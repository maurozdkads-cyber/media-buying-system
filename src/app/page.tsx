import DailyNoteCard from "@/components/dashboard/DailyNoteCard";
import WeeklyPlanCard from "@/components/dashboard/WeeklyPlanCard";
import StatusSummary from "@/components/dashboard/StatusSummary";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Dashboard</h1>

      {/* Status Summary */}
      <StatusSummary />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <DailyNoteCard />
        <WeeklyPlanCard />
      </div>
    </div>
  );
}
