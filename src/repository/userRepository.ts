import { PrismaClient } from "@prisma/client";
import { AuthInput } from "../types/auth";

export class UserRepository {
    
    constructor(private prisma: PrismaClient) {}

    public async getByEmail({ email }: { email: string }) {
        return await this.prisma.user.findUnique({ 
            where: { email },
         });
    }

    // public async create({ name, email, balance }: AuthInput ) {}
}