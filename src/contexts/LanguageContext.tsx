"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";
type Direction = "rtl" | "ltr";

interface LanguageContextType {
    language: Language;
    dir: Direction;
    toggleLanguage: () => void;
    t: (section: keyof typeof translations["ar"], key: string) => string;
}

const translations = {
    ar: {
        sidebar: {
            overview: "الرئيسية",
            stores: "المتاجر",
            products: "المنتجات",
            orders: "الطلبات",
            data: "البيانات",
            users: "المستخدمون والصلاحيات",
            roles: "الأدوار",
            settings: "الإعدادات"
        },
        header: {
            search: "البحث...",
            ready: "هل أنت مستعد للبدء؟",
            fullAccess: "احصل على وصول كامل لجميع الميزات.",
            createAccount: "إنشاء حساب",
            language: "English"
        },
        data: {
            title: "بيانات العملاء (Data)",
            subtitle: "عرض وتحليل وتصدير بيانات العملاء وسجل مشترياتهم الحقيقية من قاعدة البيانات",
            exportCSV: "تصدير CSV",
            searchPlaceholder: "ابحث بالاسم، الإيميل، أو رقم الهاتف...",
            sortBy: "فرز حسب",
            customer: "العميل",
            purchaseDate: "تاريخ الشراء",
            purchasesCount: "مرات الشراء",
            purchaseValue: "قيمة الشراء",
            action: "إجراء",
            noCustomers: "لا يوجد عملاء مطابقين للبحث",
            loading: "جاري تحميل البيانات...",
            orderSingular: "طلب",
            orderPlural: "طلبات",
            currency: "ر.س",
            unnamed: "بدون اسم",
            none: "-"
        },
        overview: {
            performance: "تتبع أداء مبيعاتك (USD)",
            monthToDate: "منذ بداية الشهر",
            itemsSold: "وحدات مباعة",
            netSales: "صافي المبيعات",
            orders: "الطلبات",
            productCosts: "تكلفة المنتجات",
            operatingCosts: "تكاليف التشغيل",
            profitTotal: "إجمالي الربح",
            activeMetric: "نشط",
            allCountries: "كل الدول",
            productsSold: "المنتجات المباعة",
            productsSoldSub: "المنتجات في هذه الفترة",
            product: "المنتج",
            costPrice: "سعر التكلفة",
            quantitySold: "الكمية المباعة",
            revenue: "الإيرادات",
            allStores: "كل المتاجر"
        },
        stores: {
            title: "إدارة المتاجر",
            subtitle: "عرض وإدارة جميع مواقع المتاجر الخاصة بك",
            addStore: "إضافة متجر جديد",
            active: "نشط",
            inactive: "غير نشط",
            save: "حفظ",
            storeNumber: "متجر رقم",
            viewDashboard: "عرض لوحة التحكم",
            editName: "تعديل الاسم",
            noStores: "لا توجد متاجر حالياً",
        },
        users: {
            title: "المستخدمون",
            subtitle: "إدارة أعضاء فريقك وحالة حساباتهم.",
            addUser: "إضافة مستخدم",
            search: "البحث عن مستخدمين...",
            user: "المستخدم",
            role: "الدور",
            status: "الحالة",
            actions: "إجراءات"
        },
        settings: {
            title: "الإعدادات",
            subtitle: "إدارة إعدادات المنصة وربط التطبيقات الخارجية مثل إتسي (Etsy)",
            connectEtsy: "الربط مع Etsy",
            apiKeysDesc: "أدخل المفاتيح البرمجية (API Keys) الخاصة بمتجر إتسي لسحب البيانات.",
            keystring: "مفتاح API (Keystring)",
            sharedSecret: "السر المشترك (Shared Secret)",
            saveSettings: "حفظ الإعدادات",
            syncData: "مزامنة البيانات الآن",
            syncDesc: "جلب أحدث الطلبات والمنتجات من إتسي فوراً.",
        },
        orders: {
            title: "الطلبات",
            subtitle: "إدارة طلبات العملاء.",
            export: "تصدير",
            search: "البحث في الطلبات...",
            filter: "تصفية",
            orderId: "رقم الطلب",
            customer: "العميل",
            date: "التاريخ",
            status: "الحالة",
            total: "الإجمالي",
            actions: "إجراءات"
        },
        products: {
            title: "المنتجات",
            subtitle: "إدارة كتالوج المنتجات.",
            add: "إضافة منتج",
            search: "البحث في المنتجات...",
            export: "تصدير"
        },
        roles: {
            title: "الأدوار والصلاحيات",
            subtitle: "إدارة الصلاحيات لكل دور",
        },
        finance: {
            currentBalance: "الرصيد الحالي",
            monthlyAvg: "المتوسط الشهري",
            totalRevenue: "إجمالي الإيرادات",
            viewReport: "عرض التقرير الكامل",
            totalExpenses: "إجمالي المصروفات",
            viewExpenses: "عرض تفاصيل المصروفات",
            recentTransactions: "المعاملات الأخيرة",
            description: "الوصف",
            date: "التاريخ",
            amount: "المبلغ",
            status: "الحالة",
            invoice: "الفاتورة",
            completed: "مكتمل",
            pending: "قيد الانتظار"
        }
    },
    en: {
        sidebar: {
            overview: "Overview",
            stores: "Stores",
            products: "Products",
            orders: "Orders",
            data: "Data",
            users: "Users & Roles",
            roles: "Roles",
            settings: "Settings"
        },
        header: {
            search: "Search...",
            ready: "Ready to start?",
            fullAccess: "Get full access to all features.",
            createAccount: "Create Account",
            language: "العربية"
        },
        data: {
            title: "Customer Data",
            subtitle: "View, analyze, and export real customer data and purchase history",
            exportCSV: "Export CSV",
            searchPlaceholder: "Search by name, email, or phone...",
            sortBy: "Sort by",
            customer: "Customer",
            purchaseDate: "Purchase Date",
            purchasesCount: "Purchases",
            purchaseValue: "Total Spent",
            action: "Action",
            noCustomers: "No matching customers found",
            loading: "Loading data...",
            orderSingular: "Order",
            orderPlural: "Orders",
            currency: "SAR",
            unnamed: "Unnamed",
            none: "-"
        },
        overview: {
            performance: "Track your sales performance (USD)",
            monthToDate: "Month to Date",
            itemsSold: "Items sold",
            netSales: "Net sales",
            orders: "Orders",
            productCosts: "Product Costs",
            operatingCosts: "Operating Costs",
            profitTotal: "Profit total",
            activeMetric: "Active metric",
            allCountries: "All Countries",
            productsSold: "Products Sold",
            productsSoldSub: "products in this period",
            product: "Product",
            costPrice: "Cost Price (USD)",
            quantitySold: "Quantity Sold",
            revenue: "Revenue",
            allStores: "All Stores"
        },
        stores: {
            title: "Store Management",
            subtitle: "View and manage all your store locations",
            addStore: "Add new store",
            active: "Active",
            inactive: "Inactive",
            save: "Save",
            storeNumber: "Store No.",
            viewDashboard: "View Dashboard",
            editName: "Edit Name",
            noStores: "No stores currently available",
        },
        users: {
            title: "Users",
            subtitle: "Manage your team members and their account status.",
            addUser: "Add User",
            search: "Search users...",
            user: "User",
            role: "Role",
            status: "Status",
            actions: "Actions"
        },
        settings: {
            title: "Settings",
            subtitle: "Manage platform settings and connect 3rd party apps like Etsy",
            connectEtsy: "Connect with Etsy",
            apiKeysDesc: "Enter your Etsy API Keys to fetch data.",
            keystring: "API Key (Keystring)",
            sharedSecret: "Shared Secret",
            saveSettings: "Save Settings",
            syncData: "Sync data now",
            syncDesc: "Fetch latest orders and products from Etsy immediately.",
        },
        orders: {
            title: "Orders",
            subtitle: "Manage your customer orders here.",
            export: "Export",
            search: "Search orders...",
            filter: "Filter",
            orderId: "Order ID",
            customer: "Customer",
            date: "Date",
            status: "Status",
            total: "Total",
            actions: "Actions"
        },
        products: {
            title: "Products",
            subtitle: "Manage product catalog.",
            add: "Add Product",
            search: "Search products...",
            export: "Export"
        },
        roles: {
            title: "Roles & Permissions",
            subtitle: "Manage roles",
        },
        finance: {
            currentBalance: "Current Balance",
            monthlyAvg: "Monthly Avg",
            totalRevenue: "Total Revenue",
            viewReport: "View Full Report",
            totalExpenses: "Total Expenses",
            viewExpenses: "View Expenses Breakdown",
            recentTransactions: "Recent Transactions",
            description: "Description",
            date: "Date",
            amount: "Amount",
            status: "Status",
            invoice: "Invoice",
            completed: "Completed",
            pending: "Pending"
        }
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("ar");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedLang = localStorage.getItem("app_lang") as Language;
        if (storedLang === "en" || storedLang === "ar") {
            setLanguage(storedLang);
        }
    }, []);

    const dir: Direction = language === "ar" ? "rtl" : "ltr";

    useEffect(() => {
        if (mounted) {
            document.documentElement.dir = dir;
            document.documentElement.lang = language;
        }
    }, [language, dir, mounted]);

    const toggleLanguage = () => {
        const newLang = language === "ar" ? "en" : "ar";
        setLanguage(newLang);
        localStorage.setItem("app_lang", newLang);
    };

    const t = (section: keyof typeof translations["ar"], key: string) => {
        // @ts-ignore
        return translations[language]?.[section]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, dir, toggleLanguage, t }}>
            <div dir={dir} lang={language} style={{ visibility: mounted ? "visible" : "hidden" }}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
