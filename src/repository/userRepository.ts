import { PrismaClient } from "@prisma/client";
import { User } from "../types/user";

export class UserRepository {
    
    constructor(private prisma: PrismaClient) {}

    public async getByEmail({ email }: { email: string }) {
        return await this.prisma.user.findUnique({ 
            where: { email },
         });
    }

    public async create({ name, email, firebaseId, balance }: User) {
        return await this.prisma.user.create({
            data: {
                name,
                email,
                firebaseId,
                balance
            }
        });
    }
}