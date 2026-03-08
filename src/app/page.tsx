import { PrismaClient } from '@prisma/client';
import { OverviewClient } from './OverviewClient';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function Home() {
  // Aggregate real data from the database
  const orders = await (prisma as any).order.findMany({
    where: { status: "COMPLETED" },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  let itemsSold = 0;
  let netSales = 0;
  let productCosts = 0;
  let operatingCosts = 5200; // Mock operating cost since it's not in DB
  const productsMap = new Map();

  orders.forEach((order: any) => {
    netSales += order.total;
    order.items.forEach((item: any) => {
      itemsSold += item.quantity;
      productCosts += (item.product?.price || 0) * 0.4 * item.quantity; // Assuming cost is 40% of price for demo

      if (item.product) {
        if (!productsMap.has(item.product.id)) {
          productsMap.set(item.product.id, {
            name: item.product.name,
            sku: `SKU-${item.product.id.substring(0, 6)}`,
            costPrice: item.product.price * 0.4,
            quantitySold: 0,
            revenue: 0,
            category: "General"
          });
        }

        const p = productsMap.get(item.product.id);
        p.quantitySold += item.quantity;
        p.revenue += item.price * item.quantity;
      }
    });
  });

  const profitTotal = netSales - productCosts - operatingCosts;

  const products = Array.from(productsMap.values()).sort((a, b) => b.revenue - a.revenue);

  const data = {
    itemsSold,
    netSales,
    ordersCount: orders.length,
    productCosts,
    operatingCosts,
    profitTotal,
    products
  };

  return <OverviewClient initialData={data} />;
}
