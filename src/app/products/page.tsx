import { PrismaClient } from '@prisma/client';
import { ProductsClient, ProductData } from './ProductsClient';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
    const dbProducts = await (prisma as any).product.findMany({
        orderBy: { createdAt: "desc" }
    });

    const formattedProducts: ProductData[] = dbProducts.map((p: any) => ({
        id: p.id,
        name: p.name || "Unnamed Product",
        category: p.category || "General",
        price: p.price || 0,
        stock: p.inventoryQuantity || p.stock || 0,
        status: p.status || "ACTIVE",
        sku: p.sku || `SKU-${p.id.slice(0, 6)}`
    }));

    return <ProductsClient initialProducts={formattedProducts} />;
}
