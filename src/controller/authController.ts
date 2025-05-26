import { Request, Response } from 'express';
import { UserService } from "../services/userService";
import { Get, Post, JsonController, Body, Res } from 'routing-controllers'

@JsonController('/auth')
export class AuthController {

    private userService: UserService

    constructor() {
        this.userService = new UserService
    }

    @Post('/signup')
    public async signupWithEmailPassword(@Body() body: {
        name: string,
        email: string,
        password: string
    }, @Res() res: Response) {
        if (!body.name || !body.email || !body.password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        if (!body.email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        try {
            const signupUser = await this.userService.signupWithEmailPassword(body)

            return res.status(201).json({
                message: 'User registred successfully',
                token: signupUser.token
            })
        } catch (error) {
            console.log(error)

            if (error instanceof Error && 'code' in error) {
                const firebaseError = error as { code: string; message: string };

                if (firebaseError.code === 'auth/email-already-exists') {
                    return res.status(400).json({
                        message: 'Email already in use'
                    })
                }

                if (firebaseError.code === 'auth/invalid-password') {
                    return res.status(400).json({
                        message: 'Password does not meet requirements'
                    })
                }
            }

            return res.status(500).json({
                message: 'Signup failed',
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        }
    }

}
