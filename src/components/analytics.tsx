"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from "recharts";

const data = [
    { name: "Jan", revenue: 4000, orders: 240 },
    { name: "Feb", revenue: 3000, orders: 139 },
    { name: "Mar", revenue: 2000, orders: 980 },
    { name: "Apr", revenue: 2780, orders: 390 },
    { name: "May", revenue: 1890, orders: 480 },
    { name: "Jun", revenue: 2390, orders: 380 },
    { name: "Jul", revenue: 3490, orders: 430 },
];

export function AnalyticsChart() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
            <div className="col-span-4 rounded-xl border border-border bg-card text-card-foreground shadow">
                <div className="p-6">
                    <h3 className="font-semibold leading-none tracking-tight">Revenue Overview</h3>
                    <p className="text-sm text-muted-foreground mt-2">Monthly revenue for the current year.</p>
                </div>
                <div className="p-6 pt-0">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} dx={-10} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                                    itemStyle={{ color: 'var(--foreground)' }}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="col-span-3 rounded-xl border border-border bg-card text-card-foreground shadow">
                <div className="p-6">
                    <h3 className="font-semibold leading-none tracking-tight">Orders History</h3>
                    <p className="text-sm text-muted-foreground mt-2">Number of orders per month.</p>
                </div>
                <div className="p-6 pt-0">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--muted-foreground)" strokeOpacity={0.2} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} dx={-10} />
                                <Tooltip
                                    cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                                />
                                <Bar dataKey="orders" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
