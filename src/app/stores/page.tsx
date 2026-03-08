import { PrismaClient } from '@prisma/client';
import { StoresClient, StoreData } from './StoresClient';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function StoresPage() {
    // Fetch real stores
    const stores = await (prisma as any).store.findMany({
        orderBy: { createdAt: "asc" }
    });

    // Formatting data for UI
    const formattedStores: StoreData[] = stores.map((s: any) => ({
        id: s.id,
        name: s.name,
        location: s.location || "Unknown Location",
        status: s.status || "Active",
    }));

    return <StoresClient initialStores={formattedStores} />;
}
