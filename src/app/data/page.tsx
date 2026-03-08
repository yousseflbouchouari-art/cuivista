import { PrismaClient } from '@prisma/client';
import { DataClient, CustomerData } from './DataClient';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function DataPage() {
    // Fetch all customers and their orders
    const customers = await (prisma as any).customer.findMany({
        include: {
            orders: {
                where: { status: "COMPLETED" },
                orderBy: { createdAt: "desc" }
            }
        }
    });

    const formattedCustomers: CustomerData[] = customers.map((customer: any) => {
        const purchasesCount = customer.orders.length;
        const totalSpent = customer.orders.reduce((sum: number, order: any) => sum + order.total, 0);
        const lastPurchaseDate = customer.orders.length > 0
            ? customer.orders[0].createdAt.toISOString()
            : "";

        return {
            id: customer.id,
            name: customer.name,
            email: customer.email || "",
            phone: customer.phone || "",
            purchasesCount,
            totalSpent,
            lastPurchaseDate
        };
    });

    return <DataClient initialCustomers={formattedCustomers} />;
}
