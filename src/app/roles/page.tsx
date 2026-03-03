"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Plus, Shield, Check, Save } from "lucide-react";

const availablePermissions = [
    { id: "orders:read", name: "Read Orders", description: "Can view the orders list and details." },
    { id: "orders:write", name: "Manage Orders", description: "Can create, update, or delete orders." },
    { id: "products:read", name: "Read Products", description: "Can view the products catalog." },
    { id: "products:write", name: "Manage Products", description: "Can add, edit, or remove products." },
    { id: "users:read", name: "Read Users", description: "Can view users in the system." },
    { id: "users:write", name: "Manage Users", description: "Can create, edit, or suspend users." },
    { id: "roles:manage", name: "Manage Roles", description: "Can modify roles and permissions." },
];

const initialRoles = [
    { id: "R-1", name: "Super Admin", permissions: availablePermissions.map(p => p.id) },
    { id: "R-2", name: "Manager", permissions: ["orders:read", "orders:write", "products:read", "products:write", "users:read"] },
    { id: "R-3", name: "Support", permissions: ["orders:read", "products:read", "users:read"] },
];

export default function RolesBuilderPage() {
    const [roles, setRoles] = useState(initialRoles);
    const [selectedRoleId, setSelectedRoleId] = useState<string>(initialRoles[0].id);

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
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Roles Builder</h1>
                        <p className="text-muted-foreground">Configure access control levels and permissions.</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-muted h-10 px-4 py-2 border border-input bg-background shadow-sm hover:text-accent-foreground mr-2">
                            <Plus className="mr-2 h-4 w-4" /> New Role
                        </button>
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-primary text-primary-foreground shadow">
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Roles List */}
                    <div className="md:col-span-1 rounded-xl border border-border bg-card shadow-sm h-fit">
                        <div className="p-4 border-b border-border">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" /> Roles
                            </h3>
                        </div>
                        <div className="p-2 flex flex-col gap-1">
                            {roles.map(role => (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRoleId(role.id)}
                                    className={`flex flex-col items-start px-4 py-3 rounded-md transition-colors text-left ${selectedRoleId === role.id
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "hover:bg-muted text-foreground"
                                        }`}
                                >
                                    <span className="font-medium">{role.name}</span>
                                    <span className={`text-xs mt-1 ${selectedRoleId === role.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                        {role.permissions.length} permissions
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Permissions Builder */}
                    <div className="md:col-span-3 rounded-xl border border-border bg-card shadow-sm">
                        <div className="p-6 border-b border-border bg-muted/20">
                            <h3 className="text-xl font-bold text-foreground">{selectedRole?.name} Permissions</h3>
                            <p className="text-sm text-muted-foreground mt-1">Select the actions this role can perform across the system.</p>
                        </div>
                        <div className="p-6">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                                {availablePermissions.map(permission => {
                                    const isChecked = selectedRole?.permissions.includes(permission.id);
                                    return (
                                        <div
                                            key={permission.id}
                                            className={`relative flex items-start space-x-3 rounded-lg border p-4 transition-colors cursor-pointer ${isChecked ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                                                }`}
                                            onClick={() => selectedRole && togglePermission(selectedRole.id, permission.id)}
                                        >
                                            <div className="flex h-5 items-center">
                                                <div className={`h-5 w-5 rounded border flex items-center justify-center ${isChecked ? "bg-primary border-primary text-primary-foreground" : "border-input bg-background"
                                                    }`}>
                                                    {isChecked && <Check className="h-3.5 w-3.5" />}
                                                </div>
                                            </div>
                                            <div className="min-w-0 flex-1 flex flex-col">
                                                <span className={`text-sm font-medium ${isChecked ? "text-primary" : "text-foreground"}`}>
                                                    {permission.name}
                                                </span>
                                                <span className="text-sm text-muted-foreground mt-1">
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
