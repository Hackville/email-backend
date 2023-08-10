// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const transporter = nodemailer.createTransport({
      host: 'mail.forbessolarsystems.com',
      port: 993,
      auth: {
        user: 'lutor.ayangaor@forbessolarsystems.com',
        pass: 'Luti4148',
      },
      debug: true, // Enable Nodemailer debugging
    });
  console.log(transporter)
  }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      const send = await this.transporter.sendMail({
        from: this.configService.get('user'),
        to,
        subject,
        text,
      });
      console.log(send);
      console.log('Email sent successfully');
      return send
    } catch (error) {
      console.error('Error sending email:', error);
      return error.message;
    }
  }
}
