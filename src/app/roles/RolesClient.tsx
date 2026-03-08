"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Plus, Shield, Check, Save } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const availablePermissions = [
    { id: "orders:read", name: "Read Orders", description: "Can view the orders list and details." },
    { id: "orders:write", name: "Manage Orders", description: "Can create, update, or delete orders." },
    { id: "products:read", name: "Read Products", description: "Can view the products catalog." },
    { id: "products:write", name: "Manage Products", description: "Can add, edit, or remove products." },
    { id: "users:read", name: "Read Users", description: "Can view users in the system." },
    { id: "users:write", name: "Manage Users", description: "Can create, edit, or suspend users." },
    { id: "roles:manage", name: "Manage Roles", description: "Can modify roles and permissions." },
];

export interface RoleData {
    id: string;
    name: string;
    permissions: string[];
}

export function RolesClient({ initialRoles }: { initialRoles: RoleData[] }) {
    const { t, dir } = useLanguage();
    const [roles, setRoles] = useState<RoleData[]>(initialRoles.length ? initialRoles : [
        { id: "R-1", name: "Super Admin", permissions: availablePermissions.map(p => p.id) }
    ]);
    const [selectedRoleId, setSelectedRoleId] = useState<string>(roles[0].id);

    const selectedRole = roles.find(r => r.id === selectedRoleId);

    const togglePermission = (roleId: string, permissionId: string) => {
        setRoles(roles.map(role => {
            if (role.id === roleId) {
                const hasPerm = role.permissions.includes(permissionId);
                return {
                    ...role,
                    permissions: hasPerm
                        ? role.permissions.filter(p => p !== permissionId)
                        : [...role.permissions, permissionId]
                };
            }
            return role;
        }));
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto text-start">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{t("roles", "title")}</h1>
                        <p className="text-slate-500 font-medium text-sm mt-1">{t("roles", "subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-colors hover:bg-slate-50 h-10 px-5 py-2 border border-slate-200 bg-white shadow-sm text-slate-700">
                            <Plus className="me-2 h-4 w-4" /> New Role
                        </button>
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                            <Save className="me-2 h-4 w-4" /> Save Changes
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Roles List */}
                    <div className="md:col-span-1 rounded-2xl border border-slate-200 bg-white shadow-sm h-fit">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
                            <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                                <Shield className="h-5 w-5 text-blue-600" /> Roles
                            </h3>
                        </div>
                        <div className="p-2 flex flex-col gap-1">
                            {roles.map(role => (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRoleId(role.id)}
                                    className={`flex flex-col items-start px-4 py-3 rounded-xl transition-colors text-start ${selectedRoleId === role.id
                                        ? "bg-blue-600 text-white shadow-md relative"
                                        : "hover:bg-slate-50 text-slate-700"
                                        }`}
                                >
                                    {selectedRoleId === role.id && <span className={`absolute top-0 w-1.5 h-full bg-blue-400 ${dir === 'rtl' ? 'right-0' : 'left-0'} rounded-s-xl`}></span>}
                                    <span className="font-bold">{role.name}</span>
                                    <span className={`text-xs mt-1 ${selectedRoleId === role.id ? "text-blue-100" : "text-slate-500"}`}>
                                        {role.permissions.length} permissions
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Permissions Builder */}
                    <div className="md:col-span-3 rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
                            <h3 className="text-xl font-bold text-slate-900">{selectedRole?.name} Permissions</h3>
                            <p className="text-sm text-slate-500 mt-1 font-medium">Select the actions this role can perform across the system.</p>
                        </div>
                        <div className="p-6">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                                {availablePermissions.map(permission => {
                                    const isChecked = selectedRole?.permissions.includes(permission.id);
                                    return (
                                        <div
                                            key={permission.id}
                                            className={`relative flex items-start px-4 py-4 rounded-xl border transition-colors cursor-pointer w-full text-start gap-4 ${isChecked ? "border-blue-600 bg-blue-50/30 shadow-sm" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                                }`}
                                            onClick={() => selectedRole && togglePermission(selectedRole.id, permission.id)}
                                        >
                                            <div className="flex h-5 items-center mt-0.5 shrink-0">
                                                <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${isChecked ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white"
                                                    }`}>
                                                    {isChecked && <Check className="h-3 w-3" strokeWidth={3} />}
                                                </div>
                                            </div>
                                            <div className="min-w-0 flex-1 flex flex-col">
                                                <span className={`text-sm font-bold ${isChecked ? "text-blue-700" : "text-slate-700"}`}>
                                                    {permission.name}
                                                </span>
                                                <span className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                                                    {permission.description}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
