"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";

const data = [
    { month: "Jan", ca: 77722, marge: 8840 },
    { month: "Feb", ca: 71089, marge: 22974 },
    { month: "Mar", ca: 17087, marge: 8964 },
    { month: "Apr", ca: 0, marge: 0 },
    { month: "May", ca: 0, marge: 0 },
    { month: "Jun", ca: 0, marge: 0 }
];

export function MonthlyPerformanceChart() {
    return (
        <div className="w-full flex flex-col h-full bg-white relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                        Monthly Performance (CA vs Marge)
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Comparing turnover against net profit across months</p>
                </div>
            </div>

            <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorCA" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorMarge" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                        />
                        <Legend verticalAlign="top" height={36} />
                        <Area
                            type="monotone"
                            dataKey="ca"
                            name="CA (Sales)"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorCA)"
                        />
                        <Area
                            type="monotone"
                            dataKey="marge"
                            name="Marge (Profit)"
                            stroke="#10b981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorMarge)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
