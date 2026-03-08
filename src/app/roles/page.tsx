import { PrismaClient } from '@prisma/client';
import { RolesClient, RoleData } from './RolesClient';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function RolesBuilderPage() {
    const dbRoles = await (prisma as any).role.findMany({
        include: {
            permissions: true
        }
    });

    const formattedRoles: RoleData[] = dbRoles.map((r: any) => ({
        id: r.id,
        name: r.name,
        permissions: r.permissions.map((p: any) => p.name) || []
    }));

    return <RolesClient initialRoles={formattedRoles} />;
}
