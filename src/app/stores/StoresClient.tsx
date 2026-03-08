"use client";

import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Store, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface StoreData {
    id: string;
    name: string;
    location: string;
    status: string;
}

export function StoresClient({ initialStores }: { initialStores: StoreData[] }) {
    const { status } = useSession();
    const router = useRouter();
    const { t, dir } = useLanguage();

    const [stores, setStores] = useState<StoreData[]>(initialStores);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [tempName, setTempName] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-medium">{t("data", "loading")}</div>;
    }

    const handleSaveName = (id: string) => {
        if (!tempName.trim()) return;
        const newStores = stores.map(s => s.id === id ? { ...s, name: tempName } : s);
        setStores(newStores);
        setEditingId(null);
        // Note: Real update would happen via server action or API route.
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 text-start">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{t("stores", "title")}</h1>
                        <p className="text-slate-500 text-sm font-medium mt-1">{t("stores", "subtitle")}</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors mt-4 sm:mt-0">
                        {t("stores", "addStore")}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {stores.map((store) => (
                        <div
                            key={store.id}
                            className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-blue-500 hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute top-0 end-0 w-1.5 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                        <Store className="w-6 h-6" />
                                    </div>
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${store.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {store.status === 'Active' ? t("stores", "active") : t("stores", "inactive")}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between group/title mb-1 relative">
                                    {editingId === store.id ? (
                                        <div className="flex items-center gap-2 w-full absolute inset-0 z-10 bg-white" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                autoFocus
                                                type="text"
                                                value={tempName}
                                                onChange={(e) => setTempName(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSaveName(store.id)}
                                                className="flex-1 bg-slate-50 border border-blue-300 rounded-lg px-3 py-1.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleSaveName(store.id); }}
                                                className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold transition-colors"
                                            >
                                                {t("stores", "save")}
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate flex-1 text-start">{store.name}</h3>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setEditingId(store.id); setTempName(store.name); }}
                                                className="opacity-0 group-hover/title:opacity-100 p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-all ms-2"
                                                title={t("stores", "editName")}
                                            >
                                                <Settings className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                <p className="text-slate-500 text-xs text-start">{t("stores", "storeNumber")} {store.id} • {store.location}</p>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <Link href={`/stores/${store.id}`} className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                    <span className={`transition-transform ${dir === 'rtl' ? 'group-hover:-translate-x-1 ms-2' : 'group-hover:translate-x-1 me-2 order-last'}`}>
                                        {dir === 'rtl' ? '←' : '→'}
                                    </span>
                                    {t("stores", "viewDashboard")}
                                </Link>
                            </div>
                        </div>
                    ))}
                    {stores.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-500 font-medium">
                            {t("stores", "noStores")}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
