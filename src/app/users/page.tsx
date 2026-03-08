import { PrismaClient } from '@prisma/client';
import { UsersClient, UserData } from './UsersClient';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function UsersPage() {
    // Fetch users from DB. Assuming user table exists which it does (managed by next-auth)
    const dbUsers = await (prisma as any).user.findMany({
        orderBy: { id: "desc" }
    });

    const formattedUsers: UserData[] = dbUsers.map((u: any) => ({
        id: u.id,
        name: u.name || "Unknown",
        email: u.email || "No email",
        role: u.role || "User",
        status: "Active" // Mocking status since it might not be explicitly supported natively
    }));

    // if db is empty or just has 1 admin we can append mock users manually for demo, but we just use DB.

    return <UsersClient initialUsers={formattedUsers} />;
}
