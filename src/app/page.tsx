import { Sidebar } from "@/components/layout/Sidebar";
import { StatusBanner } from "@/components/layout/StatusBanner";
import { TodayFocus } from "@/components/dashboard/TodayFocus";
import { ActiveTask } from "@/components/dashboard/ActiveTask";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { TaskQueue } from "@/components/dashboard/TaskQueue";
import { Opportunities } from "@/components/dashboard/Opportunities";
import { CompetitorRadar } from "@/components/dashboard/CompetitorRadar";
import { Timeline } from "@/components/dashboard/Timeline";
import { CalendarStrip } from "@/components/dashboard/CalendarStrip";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:pl-[220px]">
        <StatusBanner />
        <div className="mx-auto max-w-5xl space-y-8 px-5 pt-14 lg:pt-8 pb-8">
          <TodayFocus />
          <ActiveTask />
          <StatsRow />
          <TaskQueue />
          <Opportunities />
          <CompetitorRadar />
          <Timeline />
          <CalendarStrip />
        </div>
      </main>
    </div>
  );
}
