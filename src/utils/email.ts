import nodemailer from 'nodemailer';
import pug from 'pug';
import htmlToText from 'html-to-text';
import Mail from 'nodemailer/lib/mailer';

export class Email {
  public async sendConfirmationEmail(email: string): Promise<void> {
    await this.sendEmail('confirmation', 'Welcome to devDo!', email);
  }

  private createMailTransport(): Mail {
    if (process.env.NODE_ENV === 'development') {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: { rejectUnauthorized: false }
      });
    }
  }

  // Send the email.
  private async sendEmail(template: string, subject: string, email: string): Promise<void> {
    // Render HTML based on a pug template.
    const html = pug.renderFile(`${__dirname}./../email-templates/${template}.pug`, { subject });

    // Email options.
    const options = {
      from: `devDo <${process.env.EMAIL_FROM}>`,
      to: email,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // Create a transport and send email.
    await this.createMailTransport().sendMail(options);
  }
}
