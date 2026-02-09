import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

interface ChatMessageDto {
    message: string;
    sessionId?: string;
    userEmail?: string;
}

@Controller('api/chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get('health')
    healthCheck() {
        return { status: 'ok', service: 'renovi-chat', timestamp: new Date().toISOString() };
    }

    @Get('history/:sessionId')
    async getHistory(@Param('sessionId') sessionId: string) {
        return this.chatService.getHistory(sessionId);
    }

    @Get('sessions/:userEmail')
    async getSessions(@Param('userEmail') userEmail: string) {
        return this.chatService.getSessions(userEmail);
    }

    @Post('save')
    async saveMessage(@Body() body: { sessionId: string; userEmail: string; message: string; response: string }) {
        return this.chatService.saveMessage(body);
    }
}
