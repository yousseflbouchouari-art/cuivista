"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { BarChart3, TrendingUp, ChevronDown } from "lucide-react";

// Mock data matching the trend-lines in the image
const chartData = [
    { name: "Feb 02", homeDecor: 8, techGadgets: 4, urbanThreads: 18 },
    { name: "Feb 03", homeDecor: 7, techGadgets: 3, urbanThreads: 16 },
    { name: "Feb 04", homeDecor: 9, techGadgets: 5, urbanThreads: 19 },
    { name: "Feb 05", homeDecor: 8, techGadgets: 3, urbanThreads: 19 },
    { name: "Feb 06", homeDecor: 9, techGadgets: 3, urbanThreads: 11 },
    { name: "Feb 07", homeDecor: 5, techGadgets: 5, urbanThreads: 15 },
    { name: "Feb 08", homeDecor: 8, techGadgets: 3, urbanThreads: 13 },
    { name: "Feb 09", homeDecor: 5, techGadgets: 5, urbanThreads: 15 },
    { name: "Feb 10", homeDecor: 5, techGadgets: 3, urbanThreads: 12 },
    { name: "Feb 11", homeDecor: 9, techGadgets: 3, urbanThreads: 11 },
    { name: "Feb 12", homeDecor: 8, techGadgets: 3, urbanThreads: 13 },
    { name: "Feb 13", homeDecor: 5, techGadgets: 5, urbanThreads: 19 },
    { name: "Feb 14", homeDecor: 5, techGadgets: 5, urbanThreads: 15 },
    { name: "Feb 15", homeDecor: 8, techGadgets: 3, urbanThreads: 10 },
    { name: "Feb 16", homeDecor: 8, techGadgets: 3, urbanThreads: 11 },
    { name: "Feb 17", homeDecor: 6, techGadgets: 4, urbanThreads: 10 },
    { name: "Feb 18", homeDecor: 6, techGadgets: 5, urbanThreads: 15 },
    { name: "Feb 19", homeDecor: 6, techGadgets: 3, urbanThreads: 19 },
    { name: "Feb 20", homeDecor: 6, techGadgets: 3, urbanThreads: 19 },
    { name: "Feb 21", homeDecor: 8, techGadgets: 3, urbanThreads: 11 },
    { name: "Feb 22", homeDecor: 5, techGadgets: 3, urbanThreads: 11 },
    { name: "Feb 23", homeDecor: 8, techGadgets: 3, urbanThreads: 15 },
    { name: "Feb 24", homeDecor: 9, techGadgets: 5, urbanThreads: 19 },
    { name: "Feb 25", homeDecor: 9, techGadgets: 4, urbanThreads: 11 },
    { name: "Feb 26", homeDecor: 7, techGadgets: 4, urbanThreads: 16 },
    { name: "Feb 27", homeDecor: 9, techGadgets: 4, urbanThreads: 15 },
    { name: "Feb 28", homeDecor: 6, techGadgets: 3, urbanThreads: 12 },
    { name: "Mar 01", homeDecor: 6, techGadgets: 3, urbanThreads: 14 },
    { name: "Mar 02", homeDecor: 6, techGadgets: 5, urbanThreads: 19 },
    { name: "Mar 03", homeDecor: 5, techGadgets: 5, urbanThreads: 14 }
];

export function ItemsSoldChart() {
    return (
        <div className="w-full flex justify-between flex-col h-full bg-white relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 z-10 w-full relative">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Items Sold by Store</h3>
                    <p className="text-sm text-slate-500 mt-1">Click on a bar to filter products</p>
                </div>

                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    {/* Toggle Group: Bar | Line */}
                    <div className="flex bg-slate-100 p-1 rounded-md">
                        <button className="flex items-center gap-1.5 px-3 py-1 text-sm font-medium text-slate-600 rounded hover:text-slate-900 transition-colors">
                            <BarChart3 className="h-3.5 w-3.5" /> Bar
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1 text-sm font-medium bg-blue-600 text-white rounded shadow-sm shadow-blue-500/20">
                            <TrendingUp className="h-3.5 w-3.5" /> Line
                        </button>
                    </div>

                    {/* Toggle Group: Day | Week | Month */}
                    <div className="flex bg-slate-100 p-1 rounded-md text-xs font-semibold overflow-hidden">
                        <button className="px-3 py-1 bg-slate-600 text-white rounded shadow-sm">Day</button>
                        <button className="px-3 py-1 text-slate-500 hover:text-slate-700">Week</button>
                        <button className="px-3 py-1 text-slate-500 hover:text-slate-700">Month</button>
                    </div>

                    {/* Dropdown: All Stores */}
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm ml-2">
                        All Stores <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                </div>
            </div>

            <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.4} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10, fontWeight: 500 }}
                            dy={15}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10, fontWeight: 500 }}
                            dx={-10}
                            ticks={[0, 5, 10, 15, 20]}
                            domain={[0, 20]}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'white', borderColor: 'var(--color-border)', borderRadius: '8px', color: 'black', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ stroke: 'var(--color-slate-200)', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />

                        <Line type="monotone" dataKey="urbanThreads" name="Urban Threads" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 5 }} />
                        <Line type="monotone" dataKey="homeDecor" name="Home Decor" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 5 }} />
                        <Line type="monotone" dataKey="techGadgets" name="Tech Gadgets" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Custom Legend to match image placement */}
            <div className="absolute bottom-0 w-full flex justify-center items-center gap-6 mt-2 pt-2 text-xs font-semibold bg-white z-10">
                <div className="flex items-center gap-1.5 text-orange-500">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-white bg-orange-500 shadow-sm relative"><div className="absolute inset-0 m-auto w-4/5 h-[2px] bg-orange-500 -ml-[2px]" /></div> Home Decor
                </div>
                <div className="flex items-center gap-1.5 text-emerald-500">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-white bg-emerald-500 shadow-sm relative"><div className="absolute inset-0 m-auto w-4/5 h-[2px] bg-emerald-500 -ml-[2px]" /></div> Tech Gadgets
                </div>
                <div className="flex items-center gap-1.5 text-blue-500">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-white bg-blue-500 shadow-sm relative"><div className="absolute inset-0 m-auto w-4/5 h-[2px] bg-blue-500 -ml-[2px]" /></div> Urban Threads
                </div>
            </div>
        </div>
    );
}
