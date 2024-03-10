import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailTemplate } from './template/email.template';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'webdevsetup239@gmail.com',
          pass: 'mkojcjbzolxhjhlo',
        },
      },
    }),
  ],
  providers: [EmailService, EmailTemplate],
  exports: [EmailService],
})
export class EmailModule {}
