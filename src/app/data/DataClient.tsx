"use client";

import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Search,
    Download,
    Filter,
    MoreHorizontal,
    Mail,
    Phone,
    Calendar,
    DollarSign,
    ShoppingBag,
    UserCircle2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface CustomerData {
    id: string;
    name: string;
    email: string;
    phone: string;
    purchasesCount: number;
    totalSpent: number;
    lastPurchaseDate: string;
}

export function DataClient({ initialCustomers }: { initialCustomers: CustomerData[] }) {
    const { status } = useSession();
    const router = useRouter();
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-medium">{t("data", "loading")}</div>;
    }

    const filteredCustomers = initialCustomers.filter(customer =>
        (customer.name && customer.name.includes(searchTerm)) ||
        (customer.email && customer.email.includes(searchTerm)) ||
        (customer.phone && customer.phone.includes(searchTerm))
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2">
                    <div className="text-start">
                        <h1 className="text-2xl font-bold text-slate-900">{t("data", "title")}</h1>
                        <p className="text-slate-500 text-sm font-medium mt-1">{t("data", "subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 sm:mt-0">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors">
                            <Download className="w-4 h-4" />
                            {t("data", "exportCSV")}
                        </button>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t("data", "searchPlaceholder")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pe-10 ps-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-slate-400 transition-all"
                        />
                    </div>
                    <div className="w-full sm:w-auto flex gap-2">
                        <button className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors">
                            <Filter className="w-4 h-4" />
                            {t("data", "sortBy")}
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-start text-sm content-table">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-start">{t("data", "customer")}</th>
                                    <th className="px-6 py-4 font-semibold text-start">{t("data", "purchaseDate")}</th>
                                    <th className="px-6 py-4 font-semibold text-center">{t("data", "purchasesCount")}</th>
                                    <th className="px-6 py-4 font-semibold text-start">{t("data", "purchaseValue")}</th>
                                    <th className="px-6 py-4 font-semibold w-16 text-center">{t("data", "action")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredCustomers.length > 0 ? (
                                    filteredCustomers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-start">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                        <UserCircle2 className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{customer.name || t("data", "unnamed")}</p>
                                                        <div className="flex flex-col text-xs text-slate-500 mt-1 gap-1">
                                                            {customer.email && <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {customer.email}</div>}
                                                            {customer.phone && <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {customer.phone}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-start">
                                                <div className="flex items-center gap-1.5 text-slate-600 font-medium whitespace-nowrap">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    {customer.lastPurchaseDate ? new Date(customer.lastPurchaseDate).toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : t("data", "none")}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex items-center justify-center bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full text-xs gap-1">
                                                    <ShoppingBag className="w-3.5 h-3.5" />
                                                    {customer.purchasesCount} {customer.purchasesCount === 1 ? t("data", "orderSingular") : t("data", "orderPlural")}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-start">
                                                <div className="flex items-center gap-1.5 text-emerald-600 font-bold whitespace-nowrap bg-emerald-50 w-fit px-3 py-1.5 rounded-lg border border-emerald-100">
                                                    <DollarSign className="w-4 h-4" />
                                                    {customer.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })} {t("data", "currency")}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            <UserCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                            <p className="text-base font-medium">{t("data", "noCustomers")}</p>
                                        </td>
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
