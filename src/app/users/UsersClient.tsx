"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Search, Plus, MoreHorizontal, UserCog } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

export function UsersClient({ initialUsers }: { initialUsers: UserData[] }) {
    const { t } = useLanguage();
    const [users] = useState<UserData[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter((u) =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-start">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{t("users", "title")}</h1>
                        <p className="text-slate-500 text-sm font-medium mt-1">{t("users", "subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                            <Plus className="me-2 h-4 w-4" /> {t("users", "addUser")}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center w-full sm:w-80 relative">
                        <Search className="absolute start-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t("users", "search")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 ps-9 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm text-start">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm text-start whitespace-nowrap">
                            <thead className="bg-slate-50/50 border-b border-slate-200">
                                <tr>
                                    <th className="h-12 px-6 text-start align-middle font-bold text-slate-500">{t("users", "user")}</th>
                                    <th className="h-12 px-6 text-start align-middle font-bold text-slate-500">{t("users", "role")}</th>
                                    <th className="h-12 px-6 text-start align-middle font-bold text-slate-500">{t("users", "status")}</th>
                                    <th className="h-12 px-6 text-end align-middle font-bold text-slate-500 w-[100px]">{t("users", "actions")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="transition-colors hover:bg-slate-50/50 group">
                                        <td className="px-6 py-4 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                                    {user.name?.charAt(0) || "U"}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer">{user.name || "Unnamed"}</span>
                                                    <span className="text-xs font-medium text-slate-500 mt-0.5">{user.email || "No Email"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className="flex items-center gap-2 font-medium text-slate-700 bg-slate-100 w-fit px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                                                <UserCog className="h-4 w-4 text-slate-500" />
                                                <span>{user.role}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-bold transition-colors shadow-sm ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                'bg-slate-50 text-slate-600 border-slate-200'
                                                }`}>
                                                {user.status === "Active" ? t("stores", "active") : t("stores", "inactive")}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle text-end">
                                            <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors ms-auto">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-slate-500 font-medium">No users found.</td>
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
