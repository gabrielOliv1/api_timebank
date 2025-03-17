import { PrismaClient, User } from "@prisma/client";
import { UserRepository } from "../repository/userRepository";
import { AuthInput } from "../types/auth";
import admin from "../firebase";

export class UserService {
    private userRepository: UserRepository

    constructor() {
        const prisma = new PrismaClient()
        this.userRepository = new UserRepository(prisma)
    }

    public async signupWithEmailPassword({ name, email, password }: AuthInput): Promise<{ token: string }> {
        const firebaseUser = await admin.auth().createUser({
            displayName: name,
            email,
            password
        })

        const firebaseId = firebaseUser.uid

        await this.createUserInOurDatabase({ name, email, firebaseId })
        const token = await this.createCustomToken(firebaseId)

        return { token }
    }

    public async createUserInOurDatabase({ name, email, firebaseId }: any) {
        const user = await this.userRepository.create({
            name: name,
            email: email,
            firebaseId: firebaseId,
            balance: 0
        })

        return user
    }

    public async createCustomToken(firebaseId: string) {
        const customToken = await admin.auth().createCustomToken(firebaseId)

        return customToken
    }
}