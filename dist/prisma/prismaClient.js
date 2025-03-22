"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const databaseUrl = process.env.PROD === 'true' ? process.env.DATABASE_URL_AZURE : process.env.DATABASE_URL_LOCAL;
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
});
