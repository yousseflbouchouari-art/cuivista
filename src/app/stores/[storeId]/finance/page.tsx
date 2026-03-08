"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { DollarSign, Wallet, Percent, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FinancePage() {
    const { status } = useSession();
    const router = useRouter();
    const params = useParams();
    const storeId = params.storeId as string;
    const { t } = useLanguage();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return <div className="p-12 flex items-center justify-center bg-slate-50 text-slate-500 rounded-xl">{t("data", "loading")}</div>;
    }

    return (
        <div className="flex flex-col gap-6 text-start">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 overflow-hidden text-white p-6 rounded-2xl border border-slate-700 shadow-sm relative">
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-slate-800 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
                    <div className="flex items-center gap-3 mb-8 relative">
                        <div className="w-10 h-10 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{t("finance", "currentBalance")}</p>
                            <h3 className="text-2xl font-bold tracking-tight" dir="ltr">$94,520.00</h3>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-sm relative">
                        <span className="text-slate-400">{t("finance", "monthlyAvg")}</span>
                        <span className="text-emerald-400 font-medium" dir="ltr">+12.5%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{t("finance", "totalRevenue")}</p>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900" dir="ltr">$142,300.00</h3>
                        </div>
                    </div>
                    <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium py-2 rounded-lg text-sm transition-colors border border-slate-200">
                        {t("finance", "viewReport")}
                    </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                            <Percent className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{t("finance", "totalExpenses")}</p>
                            <h3 className="text-2xl font-bold tracking-tight text-slate-900" dir="ltr">$47,780.00</h3>
                        </div>
                    </div>
                    <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium py-2 rounded-lg text-sm transition-colors border border-slate-200">
                        {t("finance", "viewExpenses")}
                    </button>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mt-2">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-900">{t("finance", "recentTransactions")}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-start">
                        <thead className="text-[10px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                            <tr>
                                <th className="px-4 py-3 pb-4 text-start">{t("finance", "description")}</th>
                                <th className="px-4 py-3 pb-4 text-start">{t("finance", "date")}</th>
                                <th className="px-4 py-3 pb-4 text-end">{t("finance", "amount")}</th>
                                <th className="px-4 py-3 pb-4 text-center">{t("finance", "status")}</th>
                                <th className="px-4 py-3 pb-4 text-end">{t("finance", "invoice")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { desc: "Equipment Maintenance", date: "Oct 24, 2023", amount: "-$1,200.00", status: "Completed", isPositive: false },
                                { desc: "Bulk Order Supply", date: "Oct 22, 2023", amount: "-$4,500.00", status: "Pending", isPositive: false },
                                { desc: "Wholesale Revenue", date: "Oct 20, 2023", amount: "+$12,450.00", status: "Completed", isPositive: true },
                                { desc: "Marketing Ads (Google)", date: "Oct 18, 2023", amount: "-$850.00", status: "Completed", isPositive: false },
                            ].map((tx, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-4 font-medium text-slate-900 text-start">{tx.desc}</td>
                                    <td className="px-4 py-4 text-slate-500 text-start" dir="ltr">{tx.date}</td>
                                    <td className={`px-4 py-4 text-end font-semibold ${tx.isPositive ? 'text-emerald-600' : 'text-slate-700'}`} dir="ltr">{tx.amount}</td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${tx.status === 'Completed' ? 'bg-emerald-100/50 text-emerald-700' : 'bg-amber-100/50 text-amber-700'}`}>
                                            {tx.status === 'Completed' ? t("finance", "completed") : t("finance", "pending")}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-end">
                                        <button className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50">
                                            <FileText className="w-4 h-4 inline-block" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
