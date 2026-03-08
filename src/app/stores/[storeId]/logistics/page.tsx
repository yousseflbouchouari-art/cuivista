"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Truck, MapPin, Package as PackageIcon, RefreshCw,
    Globe, Clock, DollarSign, Search, ExternalLink,
    AlertCircle, CheckCircle2, MoreHorizontal, Filter,
    Plus, TrendingUp, AlertTriangle, FileText, Upload
} from "lucide-react";

interface Shipment {
    id: string;
    trackingId: string;
    customer: string;
    destination: string;
    zone: "USA" | "EU" | "UK" | "Middle East" | "Other";
    carrier: "Aramex" | "FedEx";
    cost: number;
    status: "Prepared" | "Picked Up" | "In Transit" | "Delivered" | "Returned";
    lastUpdate: string;
    createdAt: string; // ISO Date for filtering
    expectedDays: number;
    currentDays: number;
    labelUrl?: string; // URL to the PDF label
    weight: number; // Actual weight in kg
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
}

const initialShipments: Shipment[] = [
    { id: "ORD-9910", trackingId: "ARMX-7721-001", customer: "John Doe", destination: "New York, USA", zone: "USA", carrier: "Aramex", cost: 32.50, status: "In Transit", lastUpdate: "2 hours ago", createdAt: new Date().toISOString(), expectedDays: 5, currentDays: 3, labelUrl: "/labels/label-9910.pdf", weight: 1.2, dimensions: { length: 30, width: 20, height: 15 } },
    { id: "ORD-9911", trackingId: "FDX-1122-883", customer: "Sarah Smith", destination: "London, UK", zone: "UK", carrier: "FedEx", cost: 28.10, status: "Delivered", lastUpdate: "5 hours ago", createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), expectedDays: 4, currentDays: 3, labelUrl: "/labels/label-9911.pdf", weight: 0.8, dimensions: { length: 25, width: 25, height: 10 } },
    { id: "ORD-9912", trackingId: "ARMX-0012-445", customer: "Ahmed Khan", destination: "Dubai, UAE", zone: "Middle East", carrier: "Aramex", cost: 15.00, status: "Prepared", lastUpdate: "1 day ago", createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), expectedDays: 3, currentDays: 1, weight: 0.5, dimensions: { length: 20, width: 15, height: 10 } },
    { id: "ORD-9913", trackingId: "FDX-9988-112", customer: "Marie Curie", destination: "Paris, FR", zone: "EU", carrier: "FedEx", cost: 45.30, status: "In Transit", lastUpdate: "1 day ago", createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), expectedDays: 4, currentDays: 6, labelUrl: "/labels/label-9913.pdf", weight: 2.5, dimensions: { length: 40, width: 30, height: 20 } },
    { id: "ORD-9914", trackingId: "", customer: "Bob Martin", destination: "Toronto, CA", zone: "Other", carrier: "FedEx", cost: 12.00, status: "Prepared", lastUpdate: "2 days ago", createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), expectedDays: 7, currentDays: 2, weight: 1.0, dimensions: { length: 30, width: 20, height: 10 } },
];

const zoneStats = [
    { zone: "USA", avgTime: "4-6 Days", count: 128, performance: "98%" },
    { zone: "EU", avgTime: "3-5 Days", count: 85, performance: "95%" },
    { zone: "UK", avgTime: "2-4 Days", count: 42, performance: "99%" },
    { zone: "Middle East", avgTime: "1-3 Days", count: 64, performance: "92%" },
];

export default function LogisticsPage() {
    const { status } = useSession();
    const router = useRouter();
    const params = useParams();
    const storeId = params.storeId as string;
    const [shipments, setShipments] = useState<Shipment[]>(initialShipments);

    // Mock upload state
    const [uploadingId, setUploadingId] = useState<string | null>(null);

    // Filtering states
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [timeFilter, setTimeFilter] = useState("All Time");
    const [zoneFilter, setZoneFilter] = useState("All");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return <div className="p-12 flex items-center justify-center bg-slate-50 text-slate-500 rounded-xl">Loading logistics...</div>;
    }

    const filteredShipments = shipments.filter(s => {
        // Search filter
        const matchesSearch = s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.customer.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        const matchesStatus = statusFilter === "All" || s.status === statusFilter;

        // Time filter
        const shipmentDate = new Date(s.createdAt);
        const now = new Date();
        let matchesTime = true;

        if (timeFilter === "Today") {
            matchesTime = shipmentDate.toDateString() === now.toDateString();
        } else if (timeFilter === "Last 7 Days") {
            const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);
            matchesTime = shipmentDate >= sevenDaysAgo;
        } else if (timeFilter === "This Month") {
            matchesTime = shipmentDate.getMonth() === now.getMonth() && shipmentDate.getFullYear() === now.getFullYear();
        }

        // Zone filter
        const matchesZone = zoneFilter === "All" || s.zone === zoneFilter;

        return matchesSearch && matchesStatus && matchesTime && matchesZone;
    });

    const totalShippingCost = filteredShipments.reduce((acc, curr) => acc + curr.cost, 0);

    const handleUploadLabel = (id: string) => {
        setUploadingId(id);
        // Simulate upload delay
        setTimeout(() => {
            setShipments(prev => prev.map(s =>
                s.id === id ? { ...s, labelUrl: `/labels/${s.id}.pdf` } : s
            ));
            setUploadingId(null);
            alert(`تم رفع البوليصة بنجاح للأوردر ${id}`);
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-8" dir="rtl">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="text-right">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900">الخدمات اللوجستية وتتبع الشحنات</h1>
                    <p className="text-sm text-slate-500 mt-1">تتبع المسارات، إدارة بوالص الشحن، وتحليل التكاليف اللوجستية.</p>
                </div>
            </div>


            {/* Main Shipments Table - Feature 4 & 6 */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-blue-600" />
                        بوالص الشحن الحالية
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="بحث برقم التتبع أو الطلب..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pr-10 pl-4 py-2 bg-white border border-slate-200 rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                            >
                                <option value="All">كل الحالات</option>
                                <option value="Prepared">جاري التجهيز</option>
                                <option value="In Transit">في الطريق</option>
                                <option value="Delivered">تم التوصيل</option>
                                <option value="Returned">مرتجع</option>
                            </select>

                            <select
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                            >
                                <option value="All Time">كل الأوقات</option>
                                <option value="Today">اليوم</option>
                                <option value="Last 7 Days">آخر 7 أيام</option>
                                <option value="This Month">هذا الشهر</option>
                            </select>

                            <select
                                value={zoneFilter}
                                onChange={(e) => setZoneFilter(e.target.value)}
                                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                            >
                                <option value="All">كل المناطق</option>
                                <option value="USA">USA</option>
                                <option value="EU">EU</option>
                                <option value="UK">UK</option>
                                <option value="Middle East">Middle East</option>
                                <option value="Other">مناطق أخرى</option>
                            </select>

                            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-right whitespace-nowrap">
                        <thead className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 border-b border-slate-100">رقم الأوردر</th>
                                <th className="px-6 py-4 border-b border-slate-100">اسم العميل</th>
                                <th className="px-6 py-4 border-b border-slate-100">رقم التتبع</th>
                                <th className="px-6 py-4 border-b border-slate-100">البوليصة (PDF)</th>
                                <th className="px-6 py-4 border-b border-slate-100">شركة الشحن</th>
                                <th className="px-6 py-4 border-b border-slate-100">الوزن / الحجم</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-center">التكلفة</th>
                                <th className="px-6 py-4 border-b border-slate-100">مدة الشحن</th>
                                <th className="px-6 py-4 border-b border-slate-100">الحالة</th>
                                <th className="px-6 py-4 border-b border-slate-100">الوجهة</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-left">أدوات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredShipments.map((shipment) => (
                                <tr key={shipment.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-900">{shipment.id}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-slate-700">{shipment.customer}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {shipment.trackingId ? (
                                            <div className="flex items-center gap-2">
                                                <div className="bg-slate-100 px-2 py-1 rounded font-mono text-[11px] text-slate-600 border border-slate-200">
                                                    {shipment.trackingId}
                                                </div>
                                                <a href="#" className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                            </div>
                                        ) : (
                                            <button className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                                                <Plus className="w-3 h-3" /> إصدار بوليصة
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {shipment.labelUrl ? (
                                            <div className="flex items-center gap-2">
                                                <a
                                                    href={shipment.labelUrl}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-bold border border-red-100 hover:bg-red-100 transition-all shadow-sm"
                                                >
                                                    <FileText className="w-3.5 h-3.5" />
                                                    عرض PDF
                                                </a>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleUploadLabel(shipment.id)}
                                                disabled={uploadingId === shipment.id}
                                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border shadow-sm ${uploadingId === shipment.id
                                                    ? 'bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed'
                                                    : 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100'
                                                    }`}
                                            >
                                                {uploadingId === shipment.id ? (
                                                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                                ) : (
                                                    <Upload className="w-3.5 h-3.5" />
                                                )}
                                                {uploadingId === shipment.id ? 'جاري الرفع...' : 'رفع PDF'}
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${shipment.carrier === 'Aramex' ? 'bg-red-500' : 'bg-blue-600'}`}></div>
                                            <span className="font-semibold text-slate-700">{shipment.carrier}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-[10px] font-bold text-slate-500">
                                                    {shipment.dimensions.length}×{shipment.dimensions.width}×{shipment.dimensions.height} سم
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-slate-400">الفعلي:</span>
                                                <span className="font-bold text-slate-700">{shipment.weight} كجم</span>
                                            </div>
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-slate-400">الحجمي:</span>
                                                <span className="font-bold text-blue-600">
                                                    {((shipment.dimensions.length * shipment.dimensions.width * shipment.dimensions.height) / 7000).toFixed(2)} كجم
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-bold text-slate-900">${shipment.cost.toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 min-w-[120px]">
                                            <div className="flex justify-between items-end">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">المنقضي</span>
                                                    <span className={`text-sm font-black ${shipment.currentDays > shipment.expectedDays ? 'text-red-600' : 'text-slate-900'}`}>
                                                        {shipment.currentDays} أيام
                                                    </span>
                                                </div>
                                                <div className="text-left flex flex-col">
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight text-left">المتوقع</span>
                                                    <span className="text-xs font-bold text-slate-500">{shipment.expectedDays} أيام</span>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                                                <div
                                                    className={`h-full transition-all duration-500 rounded-full ${shipment.currentDays > shipment.expectedDays ? 'bg-red-500' :
                                                        shipment.currentDays >= shipment.expectedDays - 1 ? 'bg-amber-400' : 'bg-emerald-500'
                                                        }`}
                                                    style={{ width: `${Math.min((shipment.currentDays / shipment.expectedDays) * 100, 100)}%` }}
                                                ></div>
                                            </div>

                                            {/* Status Badge */}
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                {shipment.currentDays > shipment.expectedDays ? (
                                                    <span className="flex items-center gap-1 text-[10px] font-black text-red-600 animate-pulse">
                                                        <AlertTriangle className="w-3 h-3" /> متأخر بـ {shipment.currentDays - shipment.expectedDays} يوم
                                                    </span>
                                                ) : shipment.status === 'Delivered' ? (
                                                    <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600">
                                                        <CheckCircle2 className="w-3 h-3" /> وصل في الموعد
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-[10px] font-black text-slate-400">
                                                        <Clock className="w-3 h-3" /> متبقي {(shipment.expectedDays - shipment.currentDays) > 0 ? (shipment.expectedDays - shipment.currentDays) : 0} أيام للتوقع
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${shipment.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
                                            shipment.status === 'In Transit' ? 'bg-blue-50 text-blue-700' :
                                                shipment.status === 'Prepared' ? 'bg-amber-50 text-amber-700' :
                                                    'bg-slate-50 text-slate-600'
                                            }`}>
                                            {shipment.status === 'Delivered' && <CheckCircle2 className="w-3 h-3" />}
                                            {shipment.status === 'In Transit' && <RefreshCw className="w-3 h-3 animate-spin-slow" />}
                                            {shipment.status === 'Prepared' && <Clock className="w-3 h-3" />}
                                            {shipment.status}
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-1 mr-1">{shipment.lastUpdate}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900">{shipment.destination}</span>
                                            <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                                                <MapPin className="w-3 h-3" /> {shipment.zone}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-left">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Section - Performance & Returns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        تنبيهات هامة
                    </h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-4 text-right">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-amber-500 shadow-sm">
                                <Scale className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-amber-900">فرق وزن مكتشف - ORD-9913</p>
                                <p className="text-xs text-amber-700 mt-0.5">وزن FedEx الفعلي 2.2kg بينما وزن النظام 1.8kg. تم تطبيق رسوم إضافية $4.50</p>
                            </div>
                        </div>
                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-4 text-right">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-500 shadow-sm">
                                <PackageIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-red-900">شحنة مرتجعة - ORD-9850</p>
                                <p className="text-xs text-red-700 mt-0.5">الوجهة: Sydney, AU. السبب: تعذر الوصول للعميل بعد 3 محاولات.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        أداء شركات الشحن
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="font-bold text-slate-700">Aramex</span>
                                <span className="text-emerald-600 font-bold">94% Success</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="w-[94%] h-full bg-emerald-500"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="font-bold text-slate-700">FedEx</span>
                                <span className="text-blue-600 font-bold">91% Success</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="w-[91%] h-full bg-blue-600"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Minimal Scale icon helper
function Scale({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="M7 21h10" />
            <path d="M12 3v18" />
            <path d="M3 7h18" />
        </svg>
    );
}
