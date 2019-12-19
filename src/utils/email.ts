import nodemailer from 'nodemailer';
import pug from 'pug';
import htmlToText from 'html-to-text';
import Mail from 'nodemailer/lib/mailer';
import sgMail from '@sendgrid/mail';
import { DEV_ENV, EMAIL, SENDGRID_API_KEY, EMAIL_FROM } from './config';

export class Email {
  public async sendVerificationEmail(email: string, firstName: string, url: string): Promise<void> {
    await this.sendEmail('verification', 'Verify your email!', email, firstName, url);
  }

  public async sendResetPasswordEmail(email: string, firstName: string, url: string): Promise<void> {
    await this.sendEmail('reset-password', 'Reset password!', email, firstName, url);
  }

  private createMailTransport(): Mail {
    return nodemailer.createTransport({
      host: EMAIL.host,
      port: EMAIL.port,
      auth: {
        user: EMAIL.user,
        pass: EMAIL.password
      },
      tls: { rejectUnauthorized: false }
    });
  }

  // Send the email.
  private async sendEmail(
    template: string,
    subject: string,
    email: string,
    firstName: string,
    url: string
  ): Promise<void> {
    // Render HTML based on a pug template.
    const html = pug.renderFile(`${__dirname}/../email-templates/${template}.pug`, { subject, firstName, url, email });

    // Email options.
    const options = {
      from: `devDo <${EMAIL_FROM}>`,
      to: email,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // Create a transport and send email.
    if (DEV_ENV) {
      return await this.createMailTransport().sendMail(options);
    }

    sgMail.setApiKey(SENDGRID_API_KEY);
    sgMail.send(options);
  }
}
