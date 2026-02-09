import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { AuthController } from './auth.controller';
import { ChatService } from './chat.service';

@Module({
    controllers: [ChatController, AuthController],
    providers: [ChatService],
})
export class ChatModule { }
