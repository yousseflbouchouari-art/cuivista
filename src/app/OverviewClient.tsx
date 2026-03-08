"use client";

import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ItemsSoldChart } from "@/components/ItemsSoldChart";
import { Calendar, ShoppingCart, Users, CreditCard, DollarSign, Package, LineChart, TrendingUp, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface OverviewData {
    itemsSold: number;
    netSales: number;
    ordersCount: number;
    productCosts: number;
    operatingCosts: number;
    profitTotal: number;
    products: Array<{ name: string, sku: string, costPrice: number, quantitySold: number, revenue: number, category: string }>;
}

export function OverviewClient({ initialData }: { initialData: OverviewData }) {
    const { status } = useSession();
    const router = useRouter();
    const { t } = useLanguage();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-500">{t("data", "loading")}</div>;
    }

    const kpis = [
        {
            title: t("overview", "itemsSold"),
            value: initialData.itemsSold.toLocaleString(),
            active: t("overview", "activeMetric"),
            icon: Package,
            color: "blue"
        },
        {
            title: t("overview", "netSales"),
            value: `$${initialData.netSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: DollarSign,
            color: "green"
        },
        {
            title: t("overview", "orders"),
            value: initialData.ordersCount.toLocaleString(),
            icon: ShoppingCart,
            color: "purple"
        },
        {
            title: t("overview", "productCosts"),
            value: `$${initialData.productCosts.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: CreditCard,
            color: "orange"
        },
        {
            title: t("overview", "operatingCosts"),
            value: `$${initialData.operatingCosts.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: CreditCard,
            color: "red"
        },
        {
            title: t("overview", "profitTotal"),
            value: `$${initialData.profitTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: TrendingUp,
            color: "green"
        }
    ];

    const filters = [
        { label: t("overview", "allCountries"), value: initialData.itemsSold.toLocaleString(), active: true },
        { label: "United States", value: "700" },
        { label: "United Kingdom", value: "250" },
        { label: "Saudi Arabia", value: "150" }
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 w-full text-start">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
                    <p className="text-slate-500 text-sm font-medium">{t("overview", "performance")}</p>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors mt-4 sm:mt-0">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        {t("overview", "monthToDate")}
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                    </button>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {kpis.map((kpi, idx) => {
                        const isMainActive = !!kpi.active;
                        return (
                            <div key={idx} className={`p-5 bg-white rounded-xl shadow-sm border text-start ${isMainActive ? 'border-blue-500 ring-4 ring-blue-50/50' : 'border-slate-200'} relative overflow-hidden transition-all hover:border-slate-300 group cursor-pointer`}>
                                {isMainActive && <div className="absolute start-0 top-0 h-full w-1.5 bg-blue-500"></div>}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${kpi.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                        kpi.color === 'green' ? 'bg-emerald-100 text-emerald-600' :
                                            kpi.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                                kpi.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                                                    kpi.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        <kpi.icon className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700 leading-tight">{kpi.title}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 tracking-tight" dir="ltr">{kpi.value}</h3>
                                {kpi.active && (
                                    <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-blue-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> {kpi.active}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-3 py-2">
                    {filters.map((filter, i) => (
                        <button key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filter.active
                            ? 'bg-slate-800 text-white border-slate-800'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}>
                            {filter.label} <span className={`px-1.5 py-0.5 rounded-md ${filter.active ? 'bg-slate-700/50 text-slate-200' : 'bg-slate-100 text-slate-500'}`}>{filter.value}</span>
                        </button>
                    ))}
                </div>

                {/* Chart Section */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6" dir="ltr">
                    <ItemsSoldChart />
                </div>

                {/* Table Section */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col items-stretch text-start">
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{t("overview", "productsSold")}</h3>
                            <p className="text-sm text-slate-500 mt-1">{initialData.products.length} {t("overview", "productsSoldSub")}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 sm:mt-0">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-50 rounded-lg">
                                <span className="flex items-center gap-1"><LineChart className="h-4 w-4" /> {t("overview", "allStores")}</span> <ChevronDown className="h-3 w-3 ms-1 text-slate-400" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-sm text-start whitespace-nowrap min-w-full table-auto">
                            <thead className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 border-b border-slate-100 text-start">{t("overview", "product")}</th>
                                    <th className="px-6 py-4 border-b border-slate-100 text-start">SKU</th>
                                    <th className="px-6 py-4 border-b border-slate-100 text-end">{t("overview", "costPrice")}</th>
                                    <th className="px-6 py-4 border-b border-slate-100 text-end">{t("overview", "quantitySold")}</th>
                                    <th className="px-6 py-4 border-b border-slate-100 text-end">{t("overview", "revenue")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {initialData.products.map((p, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3 text-start">
                                                <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                                    <Package className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-sm overflow-hidden text-clip whitespace-normal max-w-[200px]">{p.name}</p>
                                                    <p className="text-xs text-slate-500">{p.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">{p.sku}</td>
                                        <td className="px-6 py-4 text-end font-medium text-slate-900" dir="ltr">${p.costPrice.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-end font-bold text-slate-900">{p.quantitySold}</td>
                                        <td className="px-6 py-4 text-end font-bold text-emerald-600 bg-emerald-50/30" dir="ltr">${p.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                ))}
                                {initialData.products.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-slate-400 italic font-medium text-sm">No sales data found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
