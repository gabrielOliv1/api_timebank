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
       try {
        const signupUser = await this.userService.signupWithEmailPassword(body)

        return res.status(201).json({
            message: 'User registred successfully',
            token: signupUser.token
        })
       } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
       }
    }
    
}
