"use client";

import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Save, Link as LinkIcon, RefreshCw, KeyRound, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SettingsPage() {
    const { status } = useSession();
    const router = useRouter();
    const { t } = useLanguage();
    const [keystring, setKeystring] = useState("");
    const [sharedSecret, setSharedSecret] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-medium">{t("data", "loading")}</div>;
    }

    const handleSave = () => {
        setIsSaving(true);
        // Simulate saving to DB/LocalStorage
        setTimeout(() => setIsSaving(false), 1000);
    };

    const handleSync = () => {
        setIsSyncing(true);
        // Simulate syncing from Etsy
        setTimeout(() => setIsSyncing(false), 2000);
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
                <div className="text-start pb-2">
                    <h1 className="text-2xl font-bold text-slate-900">{t("settings", "title")}</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">{t("settings", "subtitle")}</p>
                </div>

                {/* Etsy Connection Block */}
                <div className="bg-white border text-start border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 start-0 w-1.5 h-full bg-[#F56400]"></div>

                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-orange-50 text-[#F56400] rounded-xl flex items-center justify-center shrink-0">
                            <LinkIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">{t("settings", "connectEtsy")}</h2>
                            <p className="text-sm text-slate-500 mt-1 max-w-xl">{t("settings", "apiKeysDesc")}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ms-0 md:ms-16">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <KeyRound className="w-4 h-4 text-slate-400" />
                                {t("settings", "keystring")}
                            </label>
                            <input
                                type="text"
                                value={keystring}
                                onChange={(e) => setKeystring(e.target.value)}
                                placeholder="e.g. 1a2b3c4d5e..."
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F56400]/50 focus:border-[#F56400] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <ShieldAlert className="w-4 h-4 text-slate-400" />
                                {t("settings", "sharedSecret")}
                            </label>
                            <input
                                type="password"
                                value={sharedSecret}
                                onChange={(e) => setSharedSecret(e.target.value)}
                                placeholder="••••••••••••••"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F56400]/50 focus:border-[#F56400] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-100 ms-0 md:ms-16 gap-4">
                        <div className="flex flex-col items-center sm:items-start text-center sm:text-start">
                            <button
                                onClick={handleSync}
                                disabled={isSyncing}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin text-blue-600" : ""}`} />
                                {t("settings", "syncData")}
                            </button>
                            <span className="text-xs text-slate-400 mt-2">{t("settings", "syncDesc")}</span>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#F56400] text-white hover:bg-[#d95800] rounded-xl text-sm font-bold transition-all disabled:opacity-70 shadow-sm"
                        >
                            <Save className="w-4 h-4" />
                            {isSaving ? "..." : t("settings", "saveSettings")}
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
