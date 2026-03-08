"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Search, Plus, MoreHorizontal, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface ProductData {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: string;
    sku: string;
}

export function ProductsClient({ initialProducts }: { initialProducts: ProductData[] }) {
    const { t } = useLanguage();
    const [products] = useState<ProductData[]>(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto text-start">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{t("products", "title")}</h1>
                        <p className="text-slate-500 font-medium text-sm mt-1">{t("products", "subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                            <Plus className="me-2 h-4 w-4" /> {t("products", "add")}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center w-full sm:w-80 relative">
                        <Search className="absolute start-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t("products", "search")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 ps-9 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors placeholder:text-slate-400"
                        />
                    </div>
                    <button className="hidden sm:inline-flex items-center justify-center rounded-xl text-sm font-bold transition-colors hover:bg-slate-50 h-10 px-4 py-2 border border-slate-200 bg-white text-slate-700 shadow-sm">
                        <Download className="h-4 w-4 me-2" /> {t("products", "export")}
                    </button>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden text-start">
                    <div className="w-full overflow-auto">
                        <table className="w-full text-sm text-start whitespace-nowrap min-w-full">
                            <thead className="bg-slate-50/50 border-b border-slate-200">
                                <tr>
                                    <th className="h-12 px-6 text-start align-middle font-bold text-slate-500">Product</th>
                                    <th className="h-12 px-6 text-start align-middle font-bold text-slate-500">Price</th>
                                    <th className="h-12 px-6 text-start align-middle font-bold text-slate-500">Stock</th>
                                    <th className="h-12 px-6 text-start align-middle font-bold text-slate-500">Status</th>
                                    <th className="h-12 px-6 text-end align-middle font-bold text-slate-500 w-[100px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="transition-colors hover:bg-slate-50/50 group">
                                        <td className="px-6 py-4 align-middle">
                                            <div className="flex flex-col items-start gap-1">
                                                <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{product.name}</span>
                                                <span className="text-xs text-slate-500 font-mono">{product.sku}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle font-bold text-slate-700" dir="ltr">${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                        <td className="px-6 py-4 align-middle font-medium text-slate-600">{product.stock}</td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-bold transition-colors shadow-sm ${product.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                    product.status === 'DRAFT' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                        'bg-slate-50 text-slate-700 border-slate-200'
                                                }`}>
                                                {product.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle text-end">
                                            <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
