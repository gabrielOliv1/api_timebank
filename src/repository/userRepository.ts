import { PrismaClient } from "@prisma/client";

export class UserRepository {
    
    constructor(private prisma: PrismaClient) {}

    public async getByEmail({ email }: { email: string }) {
        return await this.prisma.user.findUnique({ 
            where: { email },
         });
    }
}