"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncUsers = syncUsers;
const client_1 = require("@prisma/client");
const firebase_1 = __importDefault(require("../firebase"));
const databaseUrl = (process.env.PROD === 'true' ? process.env.DATABASE_URL_AZURE : process.env.DATABASE_URL) || "";
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
});
function syncUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield firebase_1.default.auth().listUsers();
        for (const user of users.users) {
            const existingUser = yield prisma.user.findUnique({
                where: { email: user.email }
            });
            if (!existingUser) {
                yield prisma.user.create({
                    data: {
                        firebaseId: user.uid,
                        email: user.email || "",
                        name: user.displayName || "User",
                        balance: 0
                    }
                });
            }
        }
    });
}
