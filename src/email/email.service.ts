import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) { }
    async sendEmail(options: {
        email: string; subject: string; html: string;
    }) {
        try {
            const message = {
                to: options.email,
                from: 'ayushijain0807@gmail.com',
                subject: options.subject,
                text: 'Your order is successfully placed',
                html: options.html
            };
            const emailSend = await this.mailerService.sendMail({
                ...message,
            });
            return emailSend;
        } catch (error) {
            throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
