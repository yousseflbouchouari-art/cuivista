"use client";

import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalyticsChart } from "@/components/analytics";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const stats = [
  { name: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign },
  { name: "Subscriptions", value: "+2350", change: "+180.1%", icon: Users },
  { name: "Sales", value: "+12,234", change: "+19%", icon: CreditCard },
  { name: "Active Now", value: "+573", change: "+201 since last hour", icon: Activity },
];

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
      <div className="flex flex-col gap-4 md:gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back, {session?.user?.name}!</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="rounded-xl border border-border bg-card text-card-foreground shadow p-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">{stat.name}</h3>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary">{stat.change}</span> from last month
              </p>
            </div>
          ))}
        </div>

        <AnalyticsChart />
      </div>
    </DashboardLayout>
  );
}
