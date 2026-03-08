"use client";

import { useSession } from "next-auth/react";
import { ProfitMarginChart } from "@/components/ProfitMarginChart";
import { MonthlyPerformanceChart } from "@/components/MonthlyPerformanceChart";
import { Calendar, ShoppingCart, Users, CreditCard, DollarSign, Package, LineChart, TrendingUp, ChevronDown, Percent, Megaphone, Tag, Globe, Filter, Layers } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

const kpis = [
    { title: "CA (Total Sales)", value: "$165,898.00", icon: DollarSign, color: "blue", active: "Total to date" },
    { title: "COUT (Product)", value: "$59,070.00", icon: CreditCard, color: "orange" },
    { title: "SHIPPING", value: "$31,124.00", icon: Package, color: "purple" },
    { title: "Etsy Fees", value: "$20,252.00", icon: Tag, color: "red" },
    { title: "ADS", value: "$14,559.00", icon: Megaphone, color: "blue" },
    { title: "Marge (Profit)", value: "$40,778.00", icon: TrendingUp, color: "green" }
];

const filters = [
    { label: "All Countries", value: "1,245", active: true },
    { label: "United States", value: "700" },
    { label: "United Kingdom", value: "250" },
    { label: "Canada", value: "150" },
    { label: "Australia", value: "145" }
];

const categories = [
    { label: "All Categories", margin: "32.5%", sold: 1245, active: true },
    { label: "Home Decor", margin: "28.4%", sold: 320 },
    { label: "Tech Gadgets", margin: "35.2%", sold: 215 },
    { label: "Urban Threads", margin: "31.8%", sold: 710 }
];

const dateFilters = [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month", active: true },
    { label: "Custom", value: "custom" }
];

export default function StoreDashboardOverview() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();

    const storeId = params.storeId as string;

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return <div className="p-12 flex items-center justify-center bg-slate-50 text-slate-500 rounded-xl">Loading statistics...</div>;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 pb-2">
                <div>
                    <p className="text-slate-500 text-sm font-medium">Track sales performance for <span className="font-bold text-slate-800">Store #{storeId}</span> (USD)</p>
                    <h1 className="text-2xl font-bold text-slate-900 mt-1">Dashboard Overview</h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Date Filters */}
                    <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                        {dateFilters.map((df) => (
                            <button
                                key={df.value}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${df.active
                                    ? 'bg-slate-800 text-white shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                {df.label}
                            </button>
                        ))}
                    </div>

                    {/* Country Filter */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                        <Globe className="h-4 w-4 text-slate-400" />
                        All Countries
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                    </button>

                    {/* Category Filter */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                        <Layers className="h-4 w-4 text-slate-400" />
                        All Categories
                        <span className="ml-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded font-bold underline">32.5% Marge</span>
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                    </button>

                    <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

                    <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 shadow-sm transition-colors">
                        <Filter className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* KPI Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {kpis.map((kpi, idx) => {
                    const isMainActive = kpi.active;
                    return (
                        <div key={idx} className={`p-5 bg-white rounded-xl shadow-sm border ${isMainActive ? 'border-blue-500 ring-4 ring-blue-50/50' : 'border-slate-200'} relative overflow-hidden transition-all hover:border-slate-300 group cursor-pointer`}>
                            {isMainActive && <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-500"></div>}
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                    kpi.color === 'green' ? 'bg-emerald-100 text-emerald-600' :
                                        kpi.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                            kpi.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                                                kpi.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                    <kpi.icon className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{kpi.title}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{kpi.value}</h3>
                            {kpi.active && (
                                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-blue-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> {kpi.active}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>


            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                    <MonthlyPerformanceChart />
                </div>
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                    <ProfitMarginChart />
                </div>
            </div>

            {/* Table Section: Monthly Financials */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Financial Summary by Month</h3>
                        <p className="text-sm text-slate-500 mt-1">Detailed breakdown as per your tracking table</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 border-b border-slate-100">Month</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-right">CA (Sales)</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-right">COUT (Product)</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-right">SHIPPING</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-right">Etsy Fees</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-right">ADS</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-right">Listing</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-right font-bold text-slate-900 underline">Marge</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-right">pr (%)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { m: "Janvier", ca: 77722, cout: 32245, ship: 19344, etsy: 9963, ads: 7259, list: 71, marge: 8840, pr: "11.37%" },
                                { m: "Février", ca: 71089, cout: 22465, ship: 9964, etsy: 8342, ads: 7300, list: 44, marge: 22974, pr: "32.32%" },
                                { m: "Mars", ca: 17087, cout: 4360, ship: 1816, etsy: 1947, ads: "-", list: "-", marge: 8964, pr: "52.46%" }
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-slate-900">{row.m}</td>
                                    <td className="px-6 py-4 text-right">${row.ca.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-orange-600">-${row.cout.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-purple-600">-${row.ship.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-red-500">-${row.etsy.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-blue-500">-${row.ads === "-" ? "0" : row.ads.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right">-${row.list}</td>
                                    <td className="px-6 py-4 text-right font-bold text-emerald-600 bg-emerald-50/30">${row.marge.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900 border-l border-slate-100">{row.pr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
