import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp from 'amqp-connection-manager';


@Injectable()
export class ProducerService {
    private Channel;
    constructor() {
        const connection = amqp.connect('amqp://localhost');
        this.Channel = connection.createChannel();
    }

    async addToEmailQueue(mail: any) {
        try {
            if (!this.Channel) {
                console.error('RabbitMQ channel is not initialized.');
                return;
            }
            const emailQueue = 'emailQueue';
            await this.Channel.assertQueue(emailQueue, { durable: true });
            await this.Channel.sendToQueue(
                'emailQueue',
                Buffer.from(JSON.stringify(mail)),
                {
                    persistent: true,
                },
            );
            Logger.log('Sent To Queue');
        } catch (error) {
            throw new HttpException(
                'Error adding mail to queue',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}