"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";

const initialProducts = [
    { id: "#PROD-001", name: "Premium Leather Jacket", category: "Apparel", price: "$120.00", stock: 45, status: "In Stock" },
    { id: "#PROD-002", name: "Wireless Earbuds", category: "Electronics", price: "$49.50", stock: 12, status: "Low Stock" },
    { id: "#PROD-003", name: "Smartphone 15 Pro", category: "Electronics", price: "$899.99", stock: 0, status: "Out of Stock" },
    { id: "#PROD-004", name: "Running Shoes", category: "Footwear", price: "$99.99", stock: 250, status: "In Stock" },
];

export default function ProductsPage() {
    const [products] = useState(initialProducts);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                        <p className="text-muted-foreground">Manage your product catalog.</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-primary text-primary-foreground shadow">
                            <Plus className="mr-2 h-4 w-4" /> Add Product
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center w-full max-w-sm relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>

                <div className="rounded-md border border-border">
                    <div className="w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b bg-muted/50">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle">
                                            <div className="flex items-center flex-col items-start gap-1">
                                                <span className="font-semibold">{product.name}</span>
                                                <span className="text-xs text-muted-foreground">{product.id}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">{product.category}</td>
                                        <td className="p-4 align-middle font-medium">{product.price}</td>
                                        <td className="p-4 align-middle">{product.stock}</td>
                                        <td className="p-4 align-middle">
                                            <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${product.status === 'In Stock' ? 'bg-green-500/20 text-green-700 border-green-500/20 dark:text-green-400' :
                                                    product.status === 'Out of Stock' ? 'bg-red-500/20 text-red-700 border-red-500/20 dark:text-red-400' :
                                                        'bg-yellow-500/20 text-yellow-700 border-yellow-500/20 dark:text-yellow-400'
                                                }`}>
                                                {product.status}
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input hover:bg-muted font-medium ml-auto">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
