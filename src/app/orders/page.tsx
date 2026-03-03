"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Search, Filter, MoreHorizontal, Download } from "lucide-react";

const initialOrders = [
    { id: "#ORD-001", customer: "Alice Johnson", date: "2023-11-20", status: "Delivered", total: "$120.00" },
    { id: "#ORD-002", customer: "Bob Smith", date: "2023-11-21", status: "Processing", total: "$450.50" },
    { id: "#ORD-003", customer: "Charlie Davis", date: "2023-11-22", status: "Pending", total: "$89.99" },
    { id: "#ORD-004", customer: "Diana Prince", date: "2023-11-23", status: "Cancelled", total: "$199.99" },
    { id: "#ORD-005", customer: "Evan Wright", date: "2023-11-24", status: "Delivered", total: "$32.00" },
];

export default function OrdersPage() {
    const [orders, setOrders] = useState(initialOrders);

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                        <p className="text-muted-foreground">Manage your customer orders here.</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted h-10 px-4 py-2 border border-input bg-background shadow-sm hover:text-accent-foreground">
                            <Download className="mr-2 h-4 w-4" /> Export
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center w-full max-w-sm relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted h-10 px-4 py-2 border border-input bg-background">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                    </button>
                </div>

                <div className="rounded-md border border-border">
                    <div className="w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b bg-muted/50">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium">{order.id}</td>
                                        <td className="p-4 align-middle">{order.customer}</td>
                                        <td className="p-4 align-middle">{order.date}</td>
                                        <td className="p-4 align-middle">
                                            <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-700 border-green-500/20 dark:text-green-400' :
                                                    order.status === 'Processing' ? 'bg-blue-500/20 text-blue-700 border-blue-500/20 dark:text-blue-400' :
                                                        order.status === 'Cancelled' ? 'bg-red-500/20 text-red-700 border-red-500/20 dark:text-red-400' :
                                                            'bg-yellow-500/20 text-yellow-700 border-yellow-500/20 dark:text-yellow-400'
                                                }`}>
                                                {order.status}
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">{order.total}</td>
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
