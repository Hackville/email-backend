// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: process.env['EMAIL_HOST'],
      port: 587,
      auth: {
        user: process.env['EMAIL_USER'],
        pass: process.env['EMAIL_PASS'],
      },
      debug: true, // Enable Nodemailer debugging
    });
  }

  async sendEmail( from: string, to: string, subject: string, text: string) {
    console.log(process.env['EMAIL_HOST']);
    try {
      const send = await this.transporter.sendMail({
        from,
        to,
        subject,
        text,
      });
      console.log(send);
      console.log('Email sent successfully');
      return send;
    } catch (error) {
      console.error('Error sending email:', error);
      return error.message;
    }
  }
}
