"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Search, Filter, MoreHorizontal, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface OrderData {
    id: string;
    customer: string;
    date: string;
    status: string;
    total: number;
}

export function OrdersClient({ initialOrders }: { initialOrders: OrderData[] }) {
    const { t, language } = useLanguage();
    const [orders] = useState<OrderData[]>(initialOrders);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = orders.filter((o) =>
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto text-start">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{t("orders", "title")}</h1>
                        <p className="text-slate-500 font-medium text-sm mt-1">{t("orders", "subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-colors hover:bg-slate-50 h-10 px-5 py-2 border border-slate-200 bg-white shadow-sm text-slate-700">
                            <Download className="w-4 h-4 me-2" /> {t("orders", "export")}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center w-full sm:w-80 relative">
                        <Search className="absolute start-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t("orders", "search")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 ps-9 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors placeholder:text-slate-400"
                        />
                    </div>
                    <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl text-sm font-bold transition-colors hover:bg-slate-50 h-10 px-4 py-2 border border-slate-200 bg-white text-slate-700 shadow-sm">
                        <Filter className="h-4 w-4 me-2" /> {t("orders", "filter")}
                    </button>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="w-full overflow-auto">
                        <table className="w-full text-sm text-start whitespace-nowrap min-w-full">
                            <thead className="bg-slate-50/50 border-b border-slate-200">
                                <tr>
                                    <th className="h-12 px-6 text-start align-middle font-bold text-slate-500">{t("orders", "orderId")}</th>
                                    <th className="h-12 px-6 text-start align-middle font-bold text-slate-500">{t("orders", "customer")}</th>
                                    <th className="h-12 px-6 text-start align-middle font-bold text-slate-500">{t("orders", "date")}</th>
                                    <th className="h-12 px-6 text-start align-middle font-bold text-slate-500">{t("orders", "status")}</th>
                                    <th className="h-12 px-6 text-end align-middle font-bold text-slate-500">{t("orders", "total")}</th>
                                    <th className="h-12 px-6 text-end align-middle font-bold text-slate-500 w-[100px]">{t("orders", "actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="transition-colors hover:bg-slate-50/50 group">
                                        <td className="px-6 py-4 align-middle font-mono text-xs font-semibold text-slate-600">#{order.id.slice(-8).toUpperCase()}</td>
                                        <td className="px-6 py-4 align-middle font-bold text-slate-900">{order.customer}</td>
                                        <td className="px-6 py-4 align-middle text-slate-600 font-medium">
                                            {new Date(order.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-bold transition-colors shadow-sm ${order.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                    order.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                        order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' :
                                                            'bg-slate-50 text-slate-700 border-slate-200'
                                                }`}>
                                                {order.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle text-end font-bold text-emerald-600" dir="ltr">
                                            ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-6 py-4 align-middle text-end">
                                            <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredOrders.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-500 font-medium">No orders found.</td>
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
