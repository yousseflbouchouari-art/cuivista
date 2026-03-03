"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    Shield,
    Settings,
    Moon,
    Sun,
    LogOut,
    Menu
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Products", href: "/products", icon: Package },
    { name: "Users", href: "/users", icon: Users },
    { name: "Roles Builder", href: "/roles", icon: Shield },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const { data: session } = useSession();

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar */}
            <aside className="hidden w-64 border-r border-border bg-card md:block">
                <div className="flex h-16 items-center px-6 border-b border-border">
                    <Package className="h-6 w-6 text-primary mr-2" />
                    <span className="text-xl font-bold tracking-tight">Vantix</span>
                </div>
                <div className="flex flex-col h-[calc(100vh-4rem)] justify-between">
                    <nav className="flex-1 space-y-1 px-3 py-4">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                >
                                    <item.icon
                                        className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-border">
                        <div className="flex items-center text-sm font-medium p-2 text-foreground">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                                {session?.user?.name?.charAt(0) || "U"}
                            </div>
                            <div className="flex flex-col">
                                <span>{session?.user?.name || "Mock User"}</span>
                                <span className="text-xs text-muted-foreground capitalize">{(session?.user as any)?.role || "Admin"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-6 z-10">
                    <div className="flex items-center md:hidden">
                        <button type="button" className="text-muted-foreground hover:text-foreground p-2 -ml-2 rounded-md">
                            <span className="sr-only">Open sidebar</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <span className="text-xl font-bold tracking-tight ml-2">Vantix</span>
                    </div>

                    <div className="flex items-center ml-auto space-x-4">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => signOut()}
                            className="flex items-center p-2 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-auto bg-background/50 p-4 sm:p-6 md:p-8">
                    <div className="mx-auto max-w-7xl animate-in fade-in zoom-in-95 duration-300">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
