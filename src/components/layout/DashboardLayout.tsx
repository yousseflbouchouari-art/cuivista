"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Store,
    Users,
    Settings,
    Menu,
    Search,
    Bell,
    ChevronDown,
    Database,
    Globe,
    Package,
    ShoppingCart
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/contexts/LanguageContext";

export function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { t, dir, toggleLanguage } = useLanguage();

    const mainNav = [
        { name: t("sidebar", "overview"), href: "/", icon: LayoutDashboard },
        { name: t("sidebar", "stores"), href: "/stores", icon: Store },
        { name: t("sidebar", "products"), href: "/products", icon: Package },
        { name: t("sidebar", "orders"), href: "/orders", icon: ShoppingCart },
        { name: t("sidebar", "data"), href: "/data", icon: Database },
        { name: t("sidebar", "users"), href: "/users", icon: Users },
        { name: t("sidebar", "roles"), href: "/roles", icon: Settings },
        { name: t("sidebar", "settings"), href: "/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans text-slate-900" dir={dir}>
            {/* Sidebar */}
            <aside className="hidden w-[260px] md:flex flex-col bg-white border-e border-slate-200 transition-all duration-300 shrink-0 overflow-hidden relative z-20">
                <div className="flex h-16 items-center px-6 border-b border-transparent">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">Siohioma</span>
                    </div>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto px-4 py-6 no-scrollbar">
                    <nav className="space-y-1">
                        {mainNav.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    <item.icon
                                        className={`me-3 h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto pt-8 pb-4">
                        <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-lg mx-2">
                            <p className="font-semibold text-sm">{t("header", "ready")}</p>
                            <p className="text-xs text-blue-100 mt-1 mb-4 leading-relaxed">{t("header", "fullAccess")}</p>
                            <button className="w-full bg-white text-blue-600 hover:bg-slate-50 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
                                {t("header", "createAccount")}
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">
                {/* Header Container */}
                <header className="flex h-16 items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0 gap-4">
                    <div className="flex items-center gap-2">
                        <button type="button" className="md:hidden text-slate-500 hover:text-slate-900 p-2 -ms-2 rounded-md">
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex flex-1 justify-end items-center gap-4">
                        <div className="hidden md:flex relative w-full max-w-[300px]">
                            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder={t("header", "search")}
                                className="w-full ps-9 pe-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-slate-400 transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-3 ps-4 border-s border-slate-200">
                            {/* Language Toggle */}
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                            >
                                <Globe className="h-4 w-4" />
                                {t("header", "language")}
                            </button>

                            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>
                            <div className="flex items-center gap-3 ms-2 cursor-pointer">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden shrink-0 border border-slate-300">
                                    {session?.user?.image ? (
                                        <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xs font-medium text-slate-600">AD</span>
                                    )}
                                </div>
                                <div className="hidden sm:flex items-center gap-1.5 min-w-0">
                                    <span className="text-sm font-medium text-slate-700 truncate">Admin User</span>
                                    <ChevronDown className="h-4 w-4 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-auto p-8 custom-scrollbar relative">
                    <div className="mx-auto w-full max-w-7xl animate-in fade-in duration-300 pb-12">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
