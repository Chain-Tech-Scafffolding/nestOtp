import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { MailerModule } from "@nestjs-modules/mailer";
import { QueueModule } from './queue/queue.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }), MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // set to true if using SSL/TLS
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      },
    }), UsersModule, QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
