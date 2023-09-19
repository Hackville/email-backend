// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'lutiayangaor@gmail.com',
        pass: 'vdvgiahuxcwccppo',
      },
      debug: true, // Enable Nodemailer debugging
    });
  }

  async sendEmail( from: string, to: string, subject: string, text: string) {
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
