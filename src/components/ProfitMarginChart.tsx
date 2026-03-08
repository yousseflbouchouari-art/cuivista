"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { BarChart3, TrendingUp, Percent } from "lucide-react";

const data = [
    { category: "Home Decor", margin: 28.4, color: "#f59e0b" },
    { category: "Tech Gadgets", margin: 35.2, color: "#10b981" },
    { category: "Urban Threads", margin: 31.8, color: "#3b82f6" },
    { category: "Footwear", margin: 24.5, color: "#8b5cf6" },
    { category: "Accessories", margin: 40.1, color: "#ec4899" }
];

export function ProfitMarginChart() {
    return (
        <div className="w-full flex flex-col h-full bg-white relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <Percent className="h-5 w-5 text-blue-500" />
                        Profit Margin by Category
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Average profitability across different product groups</p>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Target: 30% Margin
                </div>
            </div>

            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                            formatter={(value) => [`${value}%`, 'Margin']}
                        />
                        <Bar dataKey="margin" radius={[6, 6, 0, 0]} barSize={40}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
