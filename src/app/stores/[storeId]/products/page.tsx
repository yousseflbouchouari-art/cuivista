"use client";

import { useState, useMemo } from "react";
import {
    Search, Plus, MoreHorizontal, ExternalLink, Image as ImageIcon,
    Ruler, Edit2, Trash2, X, Save, DollarSign, Package,
    AlertTriangle, TrendingUp, Scale, Palette, LayoutGrid
} from "lucide-react";
import { useParams } from "next/navigation";

interface Product {
    id: string;
    name: string;
    sku: string;
    price: number; // Numeric for calculations
    cost: number;  // COUT
    weight: number; // in kg
    stock: number;  // Precise quantity
    image: string;
    link: string;
    sizes: string[];
    colors: string[];
    category: string;
}

const initialProducts: Product[] = [
    {
        id: "#PROD-001",
        name: "Premium Leather Jacket",
        sku: "LTH-JCK-001",
        price: 120.00,
        cost: 45.00,
        weight: 1.5,
        stock: 12,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=100",
        link: "https://example.com/p/leather-jacket",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Brown"],
        category: "Clothing"
    },
    {
        id: "#PROD-002",
        name: "Wireless Earbuds",
        sku: "WRLS-ERB-002",
        price: 49.50,
        cost: 15.00,
        weight: 0.2,
        stock: 3,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=100",
        link: "https://example.com/p/earbuds",
        sizes: ["One Size"],
        colors: ["White", "Black"],
        category: "Electronics"
    },
    {
        id: "#PROD-003",
        name: "Smartphone 15 Pro",
        sku: "SMART-15P-003",
        price: 899.99,
        cost: 650.00,
        weight: 0.4,
        stock: 0,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=100",
        link: "https://example.com/p/smartphone-15",
        sizes: ["128GB", "256GB", "512GB"],
        colors: ["Titanium", "Blue"],
        category: "Electronics"
    },
    {
        id: "#PROD-004",
        name: "Running Shoes",
        sku: "RUN-SHOE-004",
        price: 99.99,
        cost: 30.00,
        weight: 0.8,
        stock: 45,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=100",
        link: "https://example.com/p/running-shoes",
        sizes: ["38", "39", "40", "41", "42", "43"],
        colors: ["Red", "White"],
        category: "Footwear"
    },
];

export default function StoreProductsPage() {
    const params = useParams();
    const storeId = params.storeId as string;
    const [products, setProducts] = useState<Product[]>(initialProducts);

    // UI States
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Product | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Filtering
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Stats Calculation
    const stats = useMemo(() => {
        const total = products.length;
        const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
        const outOfStock = products.filter(p => p.stock === 0).length;
        const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
        return { total, lowStock, outOfStock, totalValue };
    }, [products]);

    const categories = ["All", ...Array.from(new Set(initialProducts.map(p => p.category)))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleEdit = (product: Product) => {
        setEditingId(product.id);
        setEditForm({ ...product });
    };

    const handleSave = () => {
        if (editForm) {
            setProducts(products.map(p => p.id === editForm.id ? editForm : p));
            setEditingId(null);
            setEditForm(null);
        }
    };

    const handleDelete = (id: string) => {
        if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    // Helper for adding/removing items from lists (sizes, colors)
    const toggleListItem = (list: string[], item: string) => {
        if (list.includes(item)) return list.filter(i => i !== item);
        return [...list, item];
    };

    return (
        <div className="flex flex-col gap-6" dir="rtl">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="text-right">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900">إدارة منتجات المتجر #{storeId}</h1>
                    <p className="text-sm text-slate-500 mt-1">تحكم كامل في المخزون، التكاليف، والأوزان اللوجستية.</p>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white shadow-sm hover:bg-blue-700 h-10 px-4 py-2"
                    >
                        <Plus className="ml-2 h-4 w-4" /> إضافة منتج جديد
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-500 mb-2">
                        <Package className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">إجمالي المنتجات</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-r-4 border-r-amber-400">
                    <div className="flex items-center gap-3 text-amber-500 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">مخزون منخفض</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{stats.lowStock} <span className="text-xs font-normal text-slate-400">أصناف</span></div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-r-4 border-r-red-400">
                    <div className="flex items-center gap-3 text-red-500 mb-2">
                        <X className="w-4 h-4 border rounded-full border-red-500 p-0.5" />
                        <span className="text-xs font-bold uppercase tracking-wider">نفذ من المخزن</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{stats.outOfStock}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-r-4 border-r-emerald-400">
                    <div className="flex items-center gap-3 text-emerald-500 mb-2">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">قيمة المخزون</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">${stats.totalValue.toLocaleString()}</div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center w-full max-w-sm relative font-sans">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="بحث بالاسم أو SKU..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400 transition-all text-right"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <LayoutGrid className="w-4 h-4 text-slate-400" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 min-w-[140px]"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat === "All" ? "كل التصنيفات" : cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-right whitespace-nowrap">
                        <thead className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 border-b border-slate-100">المنتج</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-center">سعر البيع</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-center">التكلفة (Cout)</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-center">المخزون</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-right">المقاسات</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-right">الألوان</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-center">الرابط</th>
                                <th className="px-6 py-4 border-b border-slate-100 text-left">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredProducts.map((product) => {
                                const isEditing = editingId === product.id;
                                const profit = (editForm?.price || product.price) - (editForm?.cost || product.cost);
                                const profitMargin = ((profit / (editForm?.price || product.price)) * 100).toFixed(1);

                                return (
                                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                        {/* Product Info */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-white overflow-hidden border border-slate-200 shrink-0 shadow-sm relative group">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                            <ImageIcon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    {isEditing ? (
                                                        <input
                                                            className="border border-blue-400 rounded px-2 py-1 text-sm w-48 mb-1"
                                                            value={editForm?.name}
                                                            onChange={e => setEditForm(prev => prev ? { ...prev, name: e.target.value } : null)}
                                                            placeholder="اسم المنتج"
                                                        />
                                                    ) : (
                                                        <p className="font-bold text-slate-900">{product.name}</p>
                                                    )}
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-mono uppercase">{product.sku}</span>
                                                        <span className="text-[10px] text-slate-400">• {product.category}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Sale Price */}
                                        <td className="px-6 py-4 text-center">
                                            {isEditing ? (
                                                <div className="flex items-center gap-1 justify-center">
                                                    <span className="text-slate-400">$</span>
                                                    <input
                                                        className="border border-blue-400 rounded px-1.5 py-1 text-sm w-20 text-center font-bold"
                                                        type="number"
                                                        value={editForm?.price}
                                                        onChange={e => setEditForm(prev => prev ? { ...prev, price: parseFloat(e.target.value) } : null)}
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-lg font-black text-slate-900">${product.price}</span>
                                            )}
                                        </td>

                                        {/* Cost (Cout) */}
                                        <td className="px-6 py-4 text-center border-x border-slate-50">
                                            {isEditing ? (
                                                <div className="flex items-center gap-1 justify-center">
                                                    <span className="text-slate-400">$</span>
                                                    <input
                                                        className="border border-blue-400 rounded px-1.5 py-1 text-sm w-20 text-center text-slate-600"
                                                        type="number"
                                                        value={editForm?.cost}
                                                        onChange={e => setEditForm(prev => prev ? { ...prev, cost: parseFloat(e.target.value) } : null)}
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-sm font-bold text-slate-500">${product.cost}</span>
                                            )}
                                        </td>

                                        {/* Stock Only */}
                                        <td className="px-6 py-4 text-center">
                                            {isEditing ? (
                                                <div className="flex items-center gap-2 justify-center">
                                                    <input
                                                        className="border border-blue-400 rounded px-1.5 py-1 text-sm w-16 text-center font-bold"
                                                        type="number"
                                                        value={editForm?.stock}
                                                        onChange={e => setEditForm(prev => prev ? { ...prev, stock: parseInt(e.target.value) } : null)}
                                                    />
                                                    <span className="text-[10px] items-center text-slate-400 font-bold">قطع</span>
                                                </div>
                                            ) : (
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold shadow-sm ${product.stock === 0 ? 'bg-red-50 text-red-600 border border-red-100' :
                                                    product.stock <= 5 ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                        'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                    }`}>
                                                    {product.stock} <span className="text-[10px] opacity-70">قطعة</span>
                                                    {product.stock <= 5 && <AlertTriangle className="w-3.5 h-3.5" />}
                                                </div>
                                            )}
                                        </td>

                                        {/* Sizes Column */}
                                        <td className="px-6 py-4">
                                            {isEditing ? (
                                                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 min-w-[140px]">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <input
                                                            id={`new-size-${product.id}`}
                                                            type="text"
                                                            placeholder="أضف مقاس..."
                                                            className="flex-1 px-2 py-1 text-[10px] border border-slate-200 rounded focus:border-blue-500 outline-none"
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    const val = (e.target as HTMLInputElement).value.trim();
                                                                    if (val && !editForm?.sizes.includes(val)) {
                                                                        setEditForm(prev => prev ? { ...prev, sizes: [...prev.sizes, val] } : null);
                                                                        (e.target as HTMLInputElement).value = '';
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                const input = document.getElementById(`new-size-${product.id}`) as HTMLInputElement;
                                                                const val = input.value.trim();
                                                                if (val && !editForm?.sizes.includes(val)) {
                                                                    setEditForm(prev => prev ? { ...prev, sizes: [...prev.sizes, val] } : null);
                                                                    input.value = '';
                                                                }
                                                            }}
                                                            className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {editForm?.sizes.map(s => (
                                                            <button
                                                                key={s}
                                                                onClick={() => setEditForm(prev => prev ? { ...prev, sizes: prev.sizes.filter(i => i !== s) } : null)}
                                                                className="group relative px-2 py-1 bg-blue-600 text-white rounded text-[10px] font-bold shadow-sm"
                                                            >
                                                                {s}
                                                                <X className="w-2 h-2 absolute -top-1 -right-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-wrap gap-1 min-w-[100px]">
                                                    {product.sizes.map(s => (
                                                        <span key={s} className="px-2 py-1 bg-white text-slate-600 rounded text-[10px] font-bold border border-slate-200 shadow-sm">{s}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </td>

                                        {/* Colors Column */}
                                        <td className="px-6 py-4">
                                            {isEditing ? (
                                                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 min-w-[140px]">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <input
                                                            id={`new-color-${product.id}`}
                                                            type="text"
                                                            placeholder="أضف لون..."
                                                            className="flex-1 px-2 py-1 text-[10px] border border-slate-200 rounded focus:border-slate-800 outline-none"
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    const val = (e.target as HTMLInputElement).value.trim();
                                                                    if (val && !editForm?.colors.includes(val)) {
                                                                        setEditForm(prev => prev ? { ...prev, colors: [...prev.colors, val] } : null);
                                                                        (e.target as HTMLInputElement).value = '';
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                const input = document.getElementById(`new-color-${product.id}`) as HTMLInputElement;
                                                                const val = input.value.trim();
                                                                if (val && !editForm?.colors.includes(val)) {
                                                                    setEditForm(prev => prev ? { ...prev, colors: [...prev.colors, val] } : null);
                                                                    input.value = '';
                                                                }
                                                            }}
                                                            className="p-1 bg-slate-800 text-white rounded hover:bg-black"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {editForm?.colors.map(c => (
                                                            <button
                                                                key={c}
                                                                onClick={() => setEditForm(prev => prev ? { ...prev, colors: prev.colors.filter(i => i !== c) } : null)}
                                                                className="group relative px-2 py-1 bg-slate-800 text-white rounded text-[10px] font-bold shadow-sm"
                                                            >
                                                                {c}
                                                                <X className="w-2 h-2 absolute -top-1 -right-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-wrap gap-1 min-w-[100px]">
                                                    {product.colors.map(c => (
                                                        <div key={c} className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 text-[10px] font-bold text-slate-600 rounded shadow-sm">
                                                            <div className="w-2 h-2 rounded-full shadow-inner" style={{ backgroundColor: c.toLowerCase() }}></div>
                                                            {c}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </td>

                                        {/* Link */}
                                        <td className="px-6 py-4 text-center">
                                            <a href={product.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-left">
                                            <div className="flex items-center gap-2">
                                                {isEditing ? (
                                                    <div className="flex flex-col gap-1">
                                                        <button
                                                            onClick={handleSave}
                                                            className="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-600 hover:bg-emerald-200 rounded-lg transition-colors"
                                                            title="حفظ"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingId(null)}
                                                            className="flex items-center justify-center w-8 h-8 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                                                            title="إلغاء"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleEdit(product)}
                                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                            title="تعديل المنتج"
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                            title="حذف المنتج"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">لا توجد منتجات مطابقة</h3>
                    <p className="text-slate-500 mt-1">حاول البحث بكلمة أخرى أو تغيير التصنيف.</p>
                </div>
            )}

            {/* Add Product Placeholder Modal (Logic can be expanded) */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <h2 className="text-lg font-bold text-slate-900">إضافة منتج جديد للمتجر</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-900 hover:bg-white rounded-full transition-all shadow-sm">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Plus className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">نموذج الإضافة الاحترافي</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed">يمكنك الآن إدخال كافة التفاصيل بما في ذلك التكلفة والوزن والمقاسات والألوان في وقت واحد.</p>

                            <div className="flex gap-3">
                                <button className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                    فتح محرر البيانات
                                </button>
                                <button onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition-all">
                                    تجاهل
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
