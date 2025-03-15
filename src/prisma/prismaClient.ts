import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.PROD === 'true' ? process.env.DATABASE_URL_AZURE : process.env.DATABASE_URL_LOCAL;

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
});