"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Factory, AlertCircle, CheckCircle2, ShoppingCart, Search, Package, Plus, ImageIcon, ExternalLink, Link2, Clock, History, Filter, Calendar, FolderTree, X } from 'lucide-react';

type OrderStatus = 'قيد الانتظار' | 'قيد التصنيع' | 'اللمسات الأخيرة' | 'فحص الجودة' | 'تم الانتهاء';

interface OrderProduct {
    name: string;
    link: string;
    image?: string;
    qty: number;
}

interface ManufacturingOrder {
    id: string;
    estimatedTime: string;
    status: OrderStatus;
    progress: number;
    dimensions?: {
        length: string;
        width: string;
        height: string;
    };
    products: OrderProduct[];
    isDelayed?: boolean;
    createdAt: string; // ISO date
    notes?: string;
}

const initialOrders: ManufacturingOrder[] = [
    { id: "ORD-9912", estimatedTime: "5 أيام", status: "قيد التصنيع", progress: 65, isDelayed: true, createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), notes: "يرجى التأكد من جودة الخياطة عند الأطراف، العميل طلب خيط بلون أغمق قليلاً.", products: [{ name: "صناعة سراويل جينز", link: "#", image: "", qty: 500 }] },
    { id: "ORD-9913", estimatedTime: "14 يوم", status: "قيد الانتظار", progress: 0, createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), notes: "طلب مستعجل للتصدير.", products: [{ name: "سماعات لأسلكية (أسود)", link: "#", image: "", qty: 2000 }] },
];

export default function ManufacturingPage() {
    const { status } = useSession();
    const router = useRouter();
    const params = useParams();
    const storeId = params.storeId as string;

    const [orders, setOrders] = useState<ManufacturingOrder[]>(initialOrders);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // New Order Form State
    const [newProducts, setNewProducts] = useState([{ name: "", link: "", image: "", qty: "" }]);
    const [newId, setNewId] = useState("");
    const [newTime, setNewTime] = useState("");
    const [newNotes, setNewNotes] = useState("");

    // Dimensions Modal State
    const [isDimensionsModalOpen, setIsDimensionsModalOpen] = useState(false);
    const [activeOrderIndex, setActiveOrderIndex] = useState<number | null>(null);
    const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });

    // Image Preview State
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return <div className="p-12 flex items-center justify-center bg-slate-50 text-slate-500 rounded-xl">جاري التحميل...</div>;
    }

    const handleAddOrder = (e: React.FormEvent) => {
        e.preventDefault();
        const newOrder: ManufacturingOrder = {
            id: newId || `ORD-${Math.floor(Math.random() * 10000)}`,
            estimatedTime: newTime,
            status: "قيد الانتظار",
            progress: 0,
            createdAt: new Date().toISOString(),
            notes: newNotes,
            products: newProducts.map(p => ({
                name: p.name,
                link: p.link,
                image: p.image,
                qty: parseInt(p.qty) || 0
            }))
        };
        setOrders([newOrder, ...orders]);
        setIsModalOpen(false);
        // Reset form
        setNewId(""); setNewTime(""); setNewNotes("");
        setNewProducts([{ name: "", link: "", image: "", qty: "" }]);
    };

    const updateOrderStatus = (index: number) => {
        const newOrders = [...orders];
        const currentOrder = newOrders[index];

        switch (currentOrder.status) {
            case 'قيد الانتظار':
                currentOrder.status = 'قيد التصنيع';
                currentOrder.progress = 25;
                break;
            case 'قيد التصنيع':
                currentOrder.status = 'اللمسات الأخيرة';
                currentOrder.progress = 75;
                break;
            case 'اللمسات الأخيرة':
                currentOrder.status = 'فحص الجودة';
                currentOrder.progress = 90;
                break;
            case 'فحص الجودة':
                // Instead of moving straight to completed, open dimensions modal
                setActiveOrderIndex(index);
                setIsDimensionsModalOpen(true);
                return;
            case 'تم الانتهاء':
                // Reset for demo purposes
                currentOrder.status = 'قيد الانتظار';
                currentOrder.progress = 0;
                currentOrder.dimensions = undefined;
                break;
        }
        setOrders(newOrders);
    };

    const handleDimensionsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (activeOrderIndex !== null) {
            const newOrders = [...orders];
            const order = newOrders[activeOrderIndex];
            order.status = 'تم الانتهاء';
            order.progress = 100;
            order.dimensions = dimensions;
            setOrders(newOrders);
            setIsDimensionsModalOpen(false);
            setActiveOrderIndex(null);
            setDimensions({ length: '', width: '', height: '' });
        }
    };

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'قيد التصنيع': return 'bg-blue-100 text-blue-700';
            case 'اللمسات الأخيرة': return 'bg-amber-100 text-amber-700';
            case 'فحص الجودة': return 'bg-purple-100 text-purple-700';
            case 'تم الانتهاء': return 'bg-emerald-100 text-emerald-700';
            case 'قيد الانتظار': return 'bg-slate-100 text-slate-600';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="flex flex-col gap-6" dir="rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                            <ShoppingCart className="w-4 h-4" />
                        </div>
                        <h3 className="text-slate-500 text-xs font-semibold">طلبات الشهر</h3>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">425</p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-1">+12% عن الشهر الماضي</p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                            <Clock className="w-4 h-4" />
                        </div>
                        <h3 className="text-slate-500 text-xs font-semibold">الطلبات المتأخرة</h3>
                    </div>
                    <p className="text-2xl font-bold text-slate-900">14</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-1">تتطلب الإنتباه فوراً</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Orders Section */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[500px]">
                    <div className="p-4 md:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-purple-600" />
                            <h2 className="text-lg font-bold text-slate-900">طلبات التصنيع الحالية</h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                                <Calendar className="w-4 h-4 text-slate-400 ml-1.5" />
                                <select className="bg-transparent text-xs text-slate-600 font-medium focus:outline-none cursor-pointer">
                                    <option>الفرز حسب التاريخ</option>
                                    <option value="week">أسبوع</option>
                                    <option value="month">شهر</option>
                                    <option value="last_30">آخر 30 يوم</option>
                                    <option value="custom">مخصص</option>
                                </select>
                            </div>
                            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                                <FolderTree className="w-4 h-4 text-slate-400 ml-1.5" />
                                <select className="bg-transparent text-xs text-slate-600 font-medium focus:outline-none cursor-pointer w-24">
                                    <option>جميع التصنيفات</option>
                                    <option>ملابس</option>
                                    <option>إلكترونيات</option>
                                    <option>معدات</option>
                                </select>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-1 text-sm font-medium bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                <Plus className="w-4 h-4" /> إضافة طلب
                            </button>
                        </div>
                    </div>
                    <div className="p-2 flex-1 overflow-y-auto custom-scrollbar">
                        {orders.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-slate-400 text-sm">لا توجد طلبات تصنيع حالياً.</div>
                        ) : (
                            orders.map((order, i) => (
                                <div key={i} className={`p-0 mb-4 rounded-xl transition-all border overflow-hidden last:mb-0 bg-white shadow-sm hover:shadow-md ${order.isDelayed ? 'border-red-200' : 'border-slate-200'}`}>
                                    <div className="flex flex-col lg:flex-row min-h-[100px]">
                                        {/* Status Accent Bar */}
                                        <div className={`w-1.5 shrink-0 ${order.isDelayed ? 'bg-red-500' :
                                            order.status === 'تم الانتهاء' ? 'bg-emerald-500' :
                                                order.status === 'قيد الانتظار' ? 'bg-slate-300' : 'bg-blue-500'}`}></div>

                                        <div className="flex-1 flex flex-col lg:flex-row">
                                            {/* 1. Basic Order Info Section */}
                                            <div className="p-4 flex flex-col justify-center gap-1 border-l border-slate-100 min-w-[140px] bg-slate-50/30">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">رقم الطلب</span>
                                                <p className="text-sm font-black text-slate-900">{order.id}</p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {order.isDelayed && (
                                                        <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[9px] font-bold shadow-sm animate-pulse">متأخر</span>
                                                    )}
                                                    {(new Date().getTime() - new Date(order.createdAt).getTime() > 86400000 * 2 && order.status !== 'تم الانتهاء') && (
                                                        <span className="bg-amber-100 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded text-[9px] font-bold shadow-sm">أولوية عالية</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 2. Products and Notes Section */}
                                            <div className="flex-[3] p-4 flex flex-col gap-4 border-l border-slate-100">
                                                <div className="flex flex-col gap-2">
                                                    {order.products.map((product, pId) => (
                                                        <div key={pId} className="flex items-center gap-4 bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100 hover:bg-white hover:border-blue-200 transition-all group/item shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                                                            {/* Enhanced Product Image with Click-to-Zoom */}
                                                            <div
                                                                onClick={() => product.image && setPreviewImage(product.image)}
                                                                className={`w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden shadow-inner group/img relative ${product.image ? 'cursor-zoom-in' : ''}`}
                                                            >
                                                                {product.image ? (
                                                                    <>
                                                                        <img src={product.image} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" alt="" />
                                                                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 flex items-center justify-center transition-colors">
                                                                            <Plus className="w-5 h-5 text-white opacity-0 group-hover/img:opacity-100 transition-opacity" />
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <Package className="w-6 h-6 text-slate-300" />
                                                                )}
                                                            </div>

                                                            {/* Re-proportioned Product Info Row */}
                                                            <div className="flex-1 flex flex-row items-center justify-between gap-4 px-1">
                                                                {/* Shrinked Name Column */}
                                                                <div className="w-[120px] lg:w-[180px] min-w-0">
                                                                    <span className="text-[9px] font-bold text-slate-400 block mb-0.5 uppercase tracking-tighter">المنتج</span>
                                                                    <h4 className="text-[11px] font-black text-slate-900 leading-tight line-clamp-2" title={product.name}>{product.name}</h4>
                                                                </div>

                                                                {/* Distinct Quantity */}
                                                                <div className="shrink-0 w-16 text-center">
                                                                    <span className="text-[9px] font-bold text-slate-400 block mb-0.5 uppercase tracking-tighter">الكمية</span>
                                                                    <div className="bg-blue-600 text-white rounded-lg py-1 px-2 shadow-sm shadow-blue-200">
                                                                        <p className="text-[11px] font-black leading-none">{product.qty}</p>
                                                                    </div>
                                                                </div>

                                                                {/* Expanded & Clearer Link */}
                                                                <div className="shrink-0 w-32 flex flex-col items-center">
                                                                    <span className="text-[9px] font-bold text-slate-400 block mb-0.5 uppercase tracking-tighter">رابط المصدر</span>
                                                                    {product.link ? (
                                                                        <a
                                                                            href={product.link}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="w-full text-[10px] bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-400 font-black flex items-center justify-center gap-2 py-1.5 rounded-lg transition-all shadow-sm group-hover/item:shadow-md"
                                                                        >
                                                                            <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                                                                            فتح الرابط
                                                                        </a>
                                                                    ) : <span className="text-slate-300 text-[10px] font-medium italic">غير متوفر</span>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {order.notes && (
                                                    <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200/50 relative overflow-hidden group">
                                                        <div className="absolute top-0 right-0 w-1 h-full bg-amber-400 opacity-50"></div>
                                                        <p className="text-[11px] text-amber-900 leading-relaxed font-medium pr-1">
                                                            <span className="font-black text-amber-700 ml-1">💡 تعليمات فنية:</span>
                                                            {order.notes}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* 3. Status & Action Section */}
                                            <div className="flex-1 p-4 flex flex-col justify-center items-center gap-4 min-w-[180px] bg-slate-50/40 border-r border-slate-100 lg:border-r-0">
                                                <div className="w-full space-y-2">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center">تتبع الزمن</span>

                                                    <div className="flex flex-col gap-1.5">
                                                        {/* Total Duration */}
                                                        <div className="flex items-center justify-between w-full bg-white px-2.5 py-1.5 rounded-lg border border-slate-100 shadow-sm transition-all hover:bg-slate-50">
                                                            <div className="flex items-center gap-1.5">
                                                                <Clock className="w-3 h-3 text-slate-400" />
                                                                <span className="text-[9px] text-slate-500 font-bold">مدة التصنيع:</span>
                                                            </div>
                                                            <span className="text-[10px] font-black text-slate-900">{order.estimatedTime}</span>
                                                        </div>

                                                        {/* Time Remaining - Logic: if finished show 'Done', if delayed show 'Delayed', else mock remaining */}
                                                        <div className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg border shadow-sm transition-all ${order.status === 'تم الانتهاء' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                                                            order.isDelayed ? 'bg-red-50 border-red-200 text-red-700 animate-pulse' :
                                                                'bg-blue-50 border-blue-200 text-blue-700'
                                                            }`}>
                                                            <div className="flex items-center gap-1.5">
                                                                <History className="w-3 h-3 opacity-60" />
                                                                <span className="text-[9px] font-extrabold uppercase tracking-tighter">المتبقي:</span>
                                                            </div>
                                                            <span className="text-[10px] font-black">
                                                                {order.status === 'تم الانتهاء' ? 'مكتمل' :
                                                                    order.isDelayed ? 'تجاوز المدة' : '3 أيام'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => updateOrderStatus(i)}
                                                    className={`w-full py-2.5 rounded-xl text-xs font-black transition-all shadow-md active:scale-[0.98] ${getStatusColor(order.status)} border border-current hover:brightness-95 hover:shadow-lg`}
                                                >
                                                    {order.status}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Add Order Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-slate-900/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-bold text-slate-900 mb-6">إضافة طلب تصنيع جديد</h2>

                        <form onSubmit={handleAddOrder} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">الرقم (SKU)</label>
                                    <input type="text" value={newId} onChange={e => setNewId(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="مثال: ORD-1025" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">وقت التصنيع المقدر</label>
                                    <input type="text" required value={newTime} onChange={e => setNewTime(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="مثال: أسبوعان" />
                                </div>
                            </div>

                            <div className="pt-2">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-bold text-slate-900">المنتجات المرتبطة بالطلب</label>
                                    <button type="button" onClick={() => setNewProducts([...newProducts, { name: '', link: '', image: '', qty: '' }])} className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> إضافة منتج</button>
                                </div>
                                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                    {newProducts.map((p, i) => (
                                        <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200 relative">
                                            {newProducts.length > 1 && (
                                                <button type="button" onClick={() => setNewProducts(newProducts.filter((_, idx) => idx !== i))} className="absolute top-2 left-2 text-slate-400 hover:text-red-500">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                            <div className="grid grid-cols-2 gap-3 mb-2">
                                                <div>
                                                    <label className="block text-[11px] font-medium text-slate-600 mb-1">اسم المنتج</label>
                                                    <input type="text" required value={p.name} onChange={e => { const np = [...newProducts]; np[i].name = e.target.value; setNewProducts(np); }} className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none" placeholder="اسم المنتج" />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-medium text-slate-600 mb-1">الكمية المطلوبة</label>
                                                    <input type="number" required value={p.qty} onChange={e => { const np = [...newProducts]; np[i].qty = e.target.value; setNewProducts(np); }} className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none" placeholder="100" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[11px] font-medium text-slate-600 mb-1">الرابط (اختياري)</label>
                                                    <input type="url" value={p.link} onChange={e => { const np = [...newProducts]; np[i].link = e.target.value; setNewProducts(np); }} className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none" dir="ltr" placeholder="https://" />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-medium text-slate-600 mb-1">الصورة (مسار)</label>
                                                    <input type="url" value={p.image} onChange={e => { const np = [...newProducts]; np[i].image = e.target.value; setNewProducts(np); }} className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none" dir="ltr" placeholder="https://..." />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">ملاحظات فنية للورشة</label>
                                <textarea
                                    value={newNotes}
                                    onChange={e => setNewNotes(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
                                    placeholder="مثال: يرجى استخدام خيوط حمراء، أو انتبه لجودة الجلد بالأسفل..."
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="submit" className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition">
                                    حفظ الطلب وبدء التصنيع
                                </button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 bg-slate-100 text-slate-700 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-200 transition">
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Set Dimensions Modal */}
            {isDimensionsModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" dir="rtl">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h2 className="text-lg font-bold text-slate-900">إنهاء الطلب - إدخال المقاسات</h2>
                            <button onClick={() => { setIsDimensionsModalOpen(false); setActiveOrderIndex(null); }} className="text-slate-400 hover:bg-slate-200 p-1.5 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleDimensionsSubmit} className="p-4 flex flex-col gap-4">
                            <p className="text-sm text-slate-600 mb-2">يرجى إدخال أبعاد ومقاسات الشحنة النهائية قبل إغلاق الطلب ونقله إلى قسم الشحن.</p>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-semibold text-slate-700">الطول (سم)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={dimensions.length}
                                        onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-semibold text-slate-700">العرض (سم)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={dimensions.width}
                                        onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-xs font-semibold text-slate-700">الارتفاع (سم)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={dimensions.height}
                                        onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-end gap-2">
                                <button type="button" onClick={() => { setIsDimensionsModalOpen(false); setActiveOrderIndex(null); }} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                                    إلغاء
                                </button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                                    تأكيد وإنهاء الطلب
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Image Preview Modal */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md transition-all animate-in fade-in duration-300"
                    onClick={() => setPreviewImage(null)}
                >
                    <div className="relative max-w-4xl w-full h-[80vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute -top-12 right-0 p-2 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <img
                            src={previewImage}
                            className="max-w-full max-h-full rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 object-contain border border-white/10"
                            alt="Preview"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
