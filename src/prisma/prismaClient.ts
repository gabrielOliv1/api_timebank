import { PrismaClient } from '@prisma/client';
import admin from '../firebase';

const databaseUrl = process.env.DATABASE_URL;

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
    log: ['query', 'info', 'warn', 'error']
});

export async function syncUsers() {
    const users = await admin.auth().listUsers()
    
    for (const user of users.users) {
        const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
        })

        if (!existingUser) {
            await prisma.user.create({
                data: {
                    firebaseId: user.uid,
                    email: user.email || "",
                    name: user.displayName || "User",
                    balance: 0
                }
            })
        }
    }
}

export default prisma