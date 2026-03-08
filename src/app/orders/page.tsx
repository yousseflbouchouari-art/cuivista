import { PrismaClient } from '@prisma/client';
import { OrdersClient, OrderData } from './OrdersClient';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
    // Fetch orders from DB and include Customer details
    const dbOrders = await (prisma as any).order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            customer: true
        }
    });

    const formattedOrders: OrderData[] = dbOrders.map((o: any) => ({
        id: o.id,
        customer: o.customer?.name || "Unknown Customer",
        date: o.createdAt.toISOString(),
        status: o.status || "COMPLETED",
        total: o.total || 0
    }));

    return <OrdersClient initialOrders={formattedOrders} />;
}
