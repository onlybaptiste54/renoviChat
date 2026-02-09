import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        // Serve static files from public folder
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            serveRoot: '/',
        }),
        ChatModule,
    ],
})
export class AppModule { }
