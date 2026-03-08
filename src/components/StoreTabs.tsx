"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart3, Factory, Truck, DollarSign, Settings, Package } from "lucide-react";

export function StoreTabs() {
    const pathname = usePathname();
    const params = useParams();
    const storeId = params.storeId as string;
    const [storeName, setStoreName] = useState<string>(`Store #${storeId}`);

    useEffect(() => {
        const savedNames = localStorage.getItem('store_names');
        if (savedNames) {
            try {
                const namesMap = JSON.parse(savedNames);
                if (namesMap[storeId]) {
                    setStoreName(namesMap[storeId]);
                }
            } catch (e) {
                console.error("Error parsing store names in tabs", e);
            }
        }
    }, [storeId]);

    const tabs = [
        { name: "الإحصائيات ونظرة عامة", href: `/stores/${storeId}`, icon: BarChart3 },
        { name: "المنتجات", href: `/stores/${storeId}/products`, icon: Package },
        { name: "التصنيع", href: `/stores/${storeId}/manufacturing`, icon: Factory },
        { name: "الخدمات اللوجستية والشحن", href: `/stores/${storeId}/logistics`, icon: Truck },
        { name: "المالية", href: `/stores/${storeId}/finance`, icon: DollarSign },
        { name: "الإعدادات", href: `/stores/${storeId}/settings`, icon: Settings },
    ];

    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <div className="text-right">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">لوحة تحكم {storeName}</h1>
                <p className="text-sm text-slate-500 mt-1">إدارة العمليات والخدمات اللوجستية والمالية لهذا المتجر.</p>
            </div>
            <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar pt-2">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${isActive
                                ? "border-blue-600 text-blue-600 bg-blue-50/50 rounded-t-lg"
                                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.name}
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
