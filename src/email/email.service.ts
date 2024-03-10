import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailTemplate } from './template/email.template';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private registerEmailtemplate: EmailTemplate,
  ) {}
  async sendMail(to: string, name: string): Promise<void> {
    return await this.mailerService.sendMail({
      to,
      from: process.env.MAIL_USER,
      subject: 'User Registered Successfully',
      html: await this.registerEmailtemplate.RegisterEmailTemplate(name),
    });
  }
}
