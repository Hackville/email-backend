// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { EmailController } from './email/email.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // You can customize the .env file location if needed
    }),
    EmailModule,
  ],
  
})
export class AppModule {}
