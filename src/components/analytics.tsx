"use client";

import {
    BarChart,
    Bar,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { MoreHorizontal, TrendingUp, Smartphone, Coffee, Gamepad2, Shirt } from "lucide-react";

const revenueData = [
    { name: "", income: 4000, expenses: 2400 },
    { name: "", income: 3000, expenses: 1398 },
    { name: "", income: 2000, expenses: 9800 },
    { name: "", income: 2780, expenses: 3908 },
    { name: "", income: 1890, expenses: 4800 },
    { name: "", income: 2390, expenses: 3800 },
    { name: "", income: 3490, expenses: 4300 },
];

const transactions = [
    { id: 1, name: "Premium T-Shirt", date: "Jul 12th 2024", status: "Completed", icon: Shirt, statusColor: "text-sidebar-active" },
    { id: 2, name: "Playstation 5", date: "Jul 12th 2024", status: "Pending", icon: Gamepad2, statusColor: "text-muted-foreground" },
    { id: 3, name: "Hoodie Gombrong", date: "Jul 12th 2024", status: "Pending", icon: Shirt, statusColor: "text-muted-foreground" },
    { id: 4, name: "iPhone 15 Pro Max", date: "Jul 12th 2024", status: "Completed", icon: Smartphone, statusColor: "text-sidebar-active" },
    { id: 5, name: "Latte", date: "Jul 12th 2024", status: "Completed", icon: Coffee, statusColor: "text-sidebar-active" },
    { id: 6, name: "Starbucks", date: "Jul 12th 2024", status: "Completed", icon: Coffee, statusColor: "text-sidebar-active" },
];

export function AnalyticsChart() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start h-full">
            {/* Transaction List */}
            <div className="rounded-[1.5rem] border border-border bg-card text-card-foreground shadow p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">Transaction</h3>
                    <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-5 w-5" /></button>
                </div>
                <div className="flex flex-col gap-5">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary">
                                    <tx.icon className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">{tx.name}</span>
                                    <span className="text-xs text-muted-foreground">{tx.date}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`text-sm font-semibold capitalize ${tx.statusColor}`}>{tx.status}</span>
                                <span className="text-[10px] text-muted-foreground font-mono">0JWEJS7ISNC</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Charts Column */}
            <div className="md:col-span-2 flex flex-col gap-6 h-full">
                {/* Revenue Chart */}
                <div className="rounded-[1.5rem] border border-border bg-card text-card-foreground shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">Revenue</h3>
                        <div className="flex items-center gap-4 text-xs font-semibold">
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-primary"></div>Income</div>
                            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-sidebar-active"></div>Expenses</div>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-3xl font-bold">$193.000</span>
                        <div className="flex items-center gap-1 text-xs font-medium text-[#45A152]">
                            <TrendingUp className="h-3 w-3" />
                            <span>+35%</span>
                        </div>
                        <span className="text-xs text-muted-foreground">from last month</span>
                    </div>

                    <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData} barGap={4}>
                                <Tooltip
                                    cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                                />
                                <Bar dataKey="income" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={12} />
                                <Bar dataKey="expenses" fill="var(--sidebar-active)" radius={[4, 4, 0, 0]} barSize={12} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales Report */}
                <div className="rounded-[1.5rem] border border-border bg-card text-card-foreground shadow p-6 flex-1">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-semibold text-lg">Sales Report</h3>
                        <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-5 w-5" /></button>
                    </div>

                    <div className="flex flex-col gap-10 w-full px-4 mb-2">
                        {/* Product Launched */}
                        <div className="relative w-full">
                            <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1 absolute -top-6 left-0 w-full px-2">
                                <span>Product Launched <span className="text-[#E28935]">(233)</span></span>
                            </div>
                            <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-sidebar-active w-[60%] rounded-full"></div>
                            </div>
                        </div>

                        {/* Ongoing Product */}
                        <div className="relative w-full">
                            <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1 absolute -top-6 left-0 w-full px-2">
                                <span>Ongoing Product <span className="text-[#E28935]">(23)</span></span>
                            </div>
                            <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-sidebar-active w-[25%] rounded-full"></div>
                            </div>
                        </div>

                        {/* Product Sold */}
                        <div className="relative w-full">
                            <div className="flex justify-end text-xs font-medium text-muted-foreground mb-1 absolute -top-6 right-0 px-2">
                                <span>Product Sold <span className="text-[#E28935]">(482)</span></span>
                            </div>
                            <div className="w-full h-4 bg-muted rounded-full overflow-hidden flex">
                                <div className="h-full bg-sidebar-active w-[85%] rounded-full border-r-[4px] border-card"></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-3 px-2 font-mono">
                                <span>0</span>
                                <span>100</span>
                                <span>200</span>
                                <span>300</span>
                                <span>400</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
