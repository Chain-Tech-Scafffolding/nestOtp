import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import amqp from 'amqp-connection-manager';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ConsumerService implements OnModuleInit {
    private channel;
    private readonly logger = new Logger(ConsumerService.name);
    constructor(private emailService: EmailService) {
        const connection = amqp.connect('amqp://localhost');
        this.channel = connection.createChannel();
    }

    public async onModuleInit() {
        try {
            const emailQueue = 'emailQueue';
            await this.channel.assertQueue(emailQueue, { durable: true });
            // Consume messages from the email queue
            await this.channel.consume(emailQueue, async (message) => {
                if (message) {
                    const content = JSON.parse(message.content.toString());
                    this.logger.log('Received message:', content);
                    await this.emailService.sendEmail(content);
                    this.channel.ack(message);
                }
            });
            this.logger.log('Consumer service started and listening for messages.');
        } catch (err) {
            this.logger.error('Error starting the consumer:', err);
        }
    }
}