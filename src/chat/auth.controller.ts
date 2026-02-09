import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly chatService: ChatService) { }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const isValid = await this.chatService.validateUser(body.email, body.password);
        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return { success: true, email: body.email };
    }
}
