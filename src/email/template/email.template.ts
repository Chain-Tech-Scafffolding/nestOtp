import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailTemplate {
  RegisterEmailTemplate(name: string) {
    return `<!DOCTYPE html>
    <html lang="en">
    
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>body,h1,p {margin: 0;padding: 0;}
                .container {max-width: 600px;margin: 0 auto;padding: 20px;background-color: #f9f9f9;font-family: Arial, sans-serif; }
     h1 {font-size: 24px; color: #333;margin-bottom: 20px; }
      p {font-size: 16px; color: #666;line-height: 1.5; } </style></head>
        <body>
            <div class="container">
                <h1>Welcome to Our Family!</h1>
                <p>Dear ${name}, thank you for joining us. Your Account is successfully activated please login and enjoy our
                    services.</p>
                <p>We're excited to have you on board!</p>
                <p>Best regards,</p>
                <p>The ChainTech Team</p>
            </div></body></html>
        `;
  }
}
