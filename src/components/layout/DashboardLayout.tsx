"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
    LayoutDashboard,
    BarChart3,
    Users,
    Package,
    Mail,
    CreditCard,
    Settings,
    Shield,
    Moon,
    Sun,
    Bell,
    Share2,
    Plus,
    Search,
    Menu,
    Asterisk,
    ChevronDown
} from "lucide-react";
import { useSession } from "next-auth/react";

const mainNav = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Statistics", href: "/statistics", icon: BarChart3 },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Product", href: "/products", icon: Package, hasSub: true },
    { name: "Messages", href: "/messages", icon: Mail, badge: "13" },
    { name: "Transactions", href: "/transactions", icon: CreditCard },
];

const generalNav = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Security", href: "/security", icon: Shield },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const { data: session } = useSession();

    return (
        <div className="flex h-screen overflow-hidden bg-background font-sans text-foreground">
            {/* Sidebar */}
            <aside className="hidden w-64 md:flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 rounded-tr-[2rem] rounded-br-[2rem] shadow-lg shrink-0 overflow-hidden relative z-20">
                <div className="flex h-24 items-center px-8">
                    <Asterisk className="h-8 w-8 text-sidebar-active mr-3" />
                    <span className="text-2xl font-semibold tracking-tight text-sidebar-active-foreground">Siohioma</span>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto px-4 pb-4 no-scrollbar">
                    <div className="mb-8">
                        <p className="px-4 text-[10px] font-bold tracking-[0.15em] text-sidebar-foreground/70 uppercase mb-4 mt-2">Menu</p>
                        <nav className="space-y-1.5">
                            {mainNav.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group relative flex items-center justify-between px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                                ? "text-sidebar-active-foreground"
                                                : "hover:text-sidebar-active-foreground"
                                            }`}
                                    >
                                        {isActive && (
                                            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-10 bg-sidebar-active rounded-r-full" />
                                        )}
                                        <div className="flex items-center">
                                            <item.icon
                                                className={`mr-4 h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-sidebar-active-foreground opacity-90" : "opacity-70 group-hover:opacity-100 group-hover:text-sidebar-active"
                                                    }`}
                                            />
                                            {item.name}
                                        </div>
                                        {item.badge && (
                                            <span className="bg-sidebar-active text-sidebar-active-foreground text-[10px] font-bold px-2 py-0.5 rounded-full ml-2">
                                                {item.badge}
                                            </span>
                                        )}
                                        {item.hasSub && (
                                            <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div>
                        <p className="px-4 text-[10px] font-bold tracking-[0.15em] text-sidebar-foreground/70 uppercase mb-4">General</p>
                        <nav className="space-y-1.5">
                            {generalNav.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group relative flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                                ? "text-sidebar-active-foreground"
                                                : "hover:text-sidebar-active-foreground"
                                            }`}
                                    >
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sidebar-active rounded-r-full" />
                                        )}
                                        <div className="flex items-center">
                                            <item.icon
                                                className={`mr-4 h-5 w-5 flex-shrink-0 transition-colors ${isActive ? "text-sidebar-active-foreground opacity-90" : "opacity-70 group-hover:opacity-100 group-hover:text-sidebar-active"
                                                    }`}
                                            />
                                            {item.name}
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                <div className="p-6 mt-auto">
                    <div className="flex items-center gap-4 text-sm px-2">
                        <div className="w-10 h-10 rounded-full bg-sidebar-active/20 flex items-center justify-center text-sidebar-active font-bold border border-sidebar-active/30 overflow-hidden shrink-0">
                            {session?.user?.image ? (
                                <img src={session.user.image} alt="User" />
                            ) : (
                                "FP"
                            )}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-white font-medium truncate">Fandaww Punx</span>
                            <span className="text-xs text-sidebar-foreground truncate mt-0.5">fandaww6@gmail.com</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header Container */}
                <header className="flex h-24 items-center justify-between px-8 py-4 shrink-0 gap-4 bg-background">
                    <div className="flex items-center gap-2">
                        <button type="button" className="md:hidden text-muted-foreground hover:text-foreground p-2 -ml-2 rounded-md">
                            <Menu className="h-6 w-6" />
                        </button>
                        <div className="flex items-center gap-2 cursor-pointer font-semibold text-xl text-foreground">
                            Sales Admin <ChevronDown className="h-5 w-5 text-muted-foreground stroke-[2.5]" />
                        </div>
                    </div>

                    <div className="flex flex-1 justify-between items-center ml-12">
                        <div className="hidden md:flex relative max-w-sm w-full">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search anything in Siohioma..."
                                className="w-full pl-5 pr-12 py-2.5 bg-card border border-border rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring placeholder:text-muted-foreground shadow-sm"
                            />
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-foreground hover:bg-muted transition-colors shadow-sm"
                            >
                                <span className="absolute">
                                    <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute left-0 top-0 h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                </span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-foreground hover:bg-muted transition-colors shadow-sm">
                                <Share2 className="h-4 w-4" />
                            </button>
                            <button className="hidden sm:flex items-center gap-2 pl-4 pr-1.5 h-10 rounded-full border border-border bg-card text-foreground font-semibold text-sm shadow-sm hover:bg-muted transition-colors ml-2">
                                Add new product <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center"><Plus className="h-4 w-4" /></div>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-auto bg-background px-8 pb-8 custom-scrollbar">
                    <div className="mx-auto w-full animate-in fade-in zoom-in-95 duration-300 pb-16">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
