/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('send_OTP')
export class sendOTPProcessor {
  constructor(private nodemailer:MailerService) {}

  @Process('OTP-mail')
  async sendMail(job: Job<any>): Promise<void> {
    await this.nodemailer.sendMail({
        to:job.data.email,
        from:"tusharrayamajhi6@gmail.com",
        subject:"OPT",
        text:"this is OPT",
        html:`<h1>${job.data.OTP}</h1>`
      })
  }
}