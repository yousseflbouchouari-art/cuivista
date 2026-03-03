"use client";

import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalyticsChart } from "@/components/analytics";
import { Calendar, MoreHorizontal, ChevronRight, TrendingUp, TrendingDown, DivideCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-border">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">An easy way to manage sales with care and precision.</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-card text-foreground rounded-full text-sm font-medium shadow-sm hover:bg-muted transition-colors">
              <Calendar className="h-4 w-4" /> January 2024 - May 2024 <ChevronRight className="h-4 w-4 rotate-90" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dark Update Card */}
              <div className="rounded-[1.5rem] bg-sidebar text-sidebar-foreground shadow p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive"></div>
                    <span className="text-white font-medium">Update</span>
                  </div>
                  <p className="text-xs text-sidebar-foreground mt-4 mb-2">Feb 12th 2024</p>
                  <h3 className="text-white text-xl font-medium leading-tight">Sales revenue increased <span className="text-sidebar-active">40%</span> in 1 week</h3>
                </div>
                <button className="flex items-center text-xs text-sidebar-foreground hover:text-white transition-colors mt-6">
                  See Statistics <ChevronRight className="h-3 w-3 ml-1" />
                </button>
              </div>

              {/* Net Income */}
              <div className="rounded-[1.5rem] border border-border bg-card text-card-foreground shadow p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Net Income</span>
                  <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-5 w-5" /></button>
                </div>
                <div className="mt-4 flex items-start gap-1">
                  <span className="font-medium text-lg mt-1">$</span>
                  <span className="text-4xl font-bold tracking-tight">193.000</span>
                </div>
                <div className="flex items-center gap-1.5 mt-6 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 text-[#45A152]" />
                  <span className="text-[#45A152]">+35%</span>
                  <span className="text-muted-foreground font-normal">from last month</span>
                </div>
              </div>

              {/* Total Return */}
              <div className="rounded-[1.5rem] border border-border bg-card text-card-foreground shadow p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Total Return</span>
                  <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-5 w-5" /></button>
                </div>
                <div className="mt-4 flex items-start gap-1">
                  <span className="font-medium text-lg mt-1">$</span>
                  <span className="text-4xl font-bold tracking-tight">32.000</span>
                </div>
                <div className="flex items-center gap-1.5 mt-6 text-sm font-medium">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  <span className="text-destructive">-24%</span>
                  <span className="text-muted-foreground font-normal">from last month</span>
                </div>
              </div>
            </div>

            {/* Bottom Dashboard Content (Analytics + Transactions) */}
            <AnalyticsChart />
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="rounded-[1.5rem] border border-border bg-card text-card-foreground shadow p-6 flex flex-col flex-1">
              <h3 className="font-semibold text-lg text-center mb-6">Total View Performance</h3>
              <div className="flex-1 flex items-center justify-center relative w-full aspect-square max-h-[200px] mx-auto">
                {/* SVG Mockup of Donut Chart matching the image */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                  {/* Total View Background / 68% lime */}
                  <circle cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="0" stroke="var(--primary)" strokeWidth="16" />
                  <circle cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="75.36" stroke="#E28935" strokeWidth="16" />
                  <circle cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="138.16" stroke="var(--sidebar-active)" strokeWidth="16" />
                  {/* Inner blank slightly */}
                  <circle cx="50" cy="50" r="31" fill="var(--card)" />
                </svg>
                {/* Chart labels placed absolutely to match */}
                <span className="absolute top-[15%] left-[15%] bg-card text-xs font-bold px-2 py-1 rounded-full shadow-sm">16%</span>
                <span className="absolute top-[25%] right-[5%] bg-card text-xs font-bold px-2 py-1 rounded-full shadow-sm">23%</span>
                <span className="absolute bottom-[20%] left-[10%] bg-card text-xs font-bold px-2 py-1 rounded-full shadow-sm">68%</span>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-muted-foreground font-medium">Total Count</span>
                  <span className="text-2xl font-bold">565K</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-6">Here are some tips on how to improve your score.</p>
              <button className="w-full mt-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
                Guide Views
              </button>

              <div className="flex items-center justify-center gap-3 mt-6 text-xs text-muted-foreground font-medium">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-sidebar-active"></div>View Count</div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-primary"></div>Percentage</div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#E28935]"></div>Sales</div>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-[#DBE4CD] text-sidebar shadow p-8 pb-6 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-80 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full text-sidebar-active" fill="currentColor">
                  <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
                </svg>
              </div>
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold leading-tight z-10">Level up your sales managing to the next level.</h3>
              <p className="text-sm opacity-80 mt-3 z-10">An easy way to manage sales with care and precision.</p>
              <button className="w-full mt-6 py-3 bg-[#32694D] text-white hover:bg-primary transition-colors rounded-xl font-semibold shadow z-10">
                Update to Siohioma+
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
