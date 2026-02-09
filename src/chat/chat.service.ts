import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ChatService implements OnModuleInit {
    private pool: Pool;

    onModuleInit() {
        this.pool = new Pool({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            user: process.env.DB_USER || 'baptiste',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'n8n',
        });
    }

    async getHistory(sessionId: string) {
        const result = await this.pool.query(
            `SELECT message, response, created_at 
             FROM renovi_chat 
             WHERE session_id = $1 
             ORDER BY created_at ASC`,
            [sessionId]
        );
        return { sessionId, messages: result.rows };
    }

    async getSessions(userEmail: string) {
        const result = await this.pool.query(
            `SELECT DISTINCT session_id, MIN(created_at) as started_at, 
                    (SELECT message FROM renovi_chat rc2 
                     WHERE rc2.session_id = rc.session_id 
                     ORDER BY created_at ASC LIMIT 1) as first_message
             FROM renovi_chat rc
             WHERE user_email = $1 
             GROUP BY session_id
             ORDER BY started_at DESC
             LIMIT 20`,
            [userEmail]
        );
        return { userEmail, sessions: result.rows };
    }

    async saveMessage(data: { sessionId: string; userEmail: string; message: string; response: string }) {
        await this.pool.query(
            `INSERT INTO renovi_chat (session_id, user_email, message, response, created_at)
             VALUES ($1, $2, $3, $4, NOW())`,
            [data.sessionId, data.userEmail, data.message, data.response]
        );
        return { success: true };
    }

    async validateUser(email: string, password: string): Promise<boolean> {
        const result = await this.pool.query(
            'SELECT password FROM renovi_users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) return false;

        // In production, use bcrypt.compare here
        return result.rows[0].password === password;
    }
}
