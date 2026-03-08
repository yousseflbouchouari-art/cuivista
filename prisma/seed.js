require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({});

async function main() {
    console.log('Seeding data...');

    // Create store
    const store1 = await prisma.store.create({
        data: {
            name: "متجر الأزياء الحديثة",
            location: "الرياض، السعودية",
            status: "ACTIVE"
        }
    });

    // Create products
    const product1 = await prisma.product.create({
        data: { name: "قميص قطني", price: 120, stock: 50, storeId: store1.id }
    });
    const product2 = await prisma.product.create({
        data: { name: "بنطال جينز", price: 200, stock: 30, storeId: store1.id }
    });
    const product3 = await prisma.product.create({
        data: { name: "حذاء رياضي", price: 350, stock: 20, storeId: store1.id }
    });

    // Create customers
    const customersData = [
        { name: "أحمد محمد", email: "ahmed@example.com", phone: "+966 50 123 4567" },
        { name: "سارة عبدالله", email: "sara@example.com", phone: "+966 55 987 6543" },
        { name: "خالد سعيد", email: "khaled@example.com", phone: "+966 54 321 0987" }
    ];

    for (const cData of customersData) {
        const customer = await prisma.customer.create({ data: cData });

        // Create 2 orders for each customer
        for (let i = 0; i < 2; i++) {
            await prisma.order.create({
                data: {
                    status: "COMPLETED",
                    total: (product1.price * 2) + product2.price + 15, // 15 = shipping
                    tax: 0,
                    shipping: 15,
                    discount: 0,
                    customerId: customer.id,
                    storeId: store1.id,
                    items: {
                        create: [
                            { productId: product1.id, quantity: 2, price: product1.price },
                            { productId: product2.id, quantity: 1, price: product2.price }
                        ]
                    }
                }
            });
        }
    }

    console.log('Seeding completed successfully!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
