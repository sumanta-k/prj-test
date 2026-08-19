import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

const sendMail = async (options) => {
  // first create mailgen instance
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: { name: 'Test Platform', link: 'https://testPlatformExample.com' }
  });

  // create email body for simple text
  const emailTextForm = mailGenerator.generatePlaintext(options.mailgenContent);
  // create email body for html
  const emailHtmlForm = mailGenerator.generate(options.mailgenContent);

  // now create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASSWORD
    }
  });

  try {
    await transporter.sendMail({
      from: '"Test Platform" <teamTest@example.com>', // sender address
      to: options.email,
      subject: options.subject,
      text: emailTextForm,
      html: emailHtmlForm
    });
  } catch (err) {
    console.error('error while sending email', err);
  }
};

const userVerificationMailgenContent = (username, verificationURL) => {
  return {
    body: {
      name: username,
      intro: 'Welcome to Test Platform',
      action: {
        instructions: 'To verify your account , please click the button',
        button: {
          color: '#22BC66',
          text: 'Confirm Your Account',
          link: verificationURL
        }
      },
      outro: 'need help or have questions reply on this email'
    }
  };
};

const forgotPasswordMailgenContent = (username, passwordResetURL) => {
  return {
    body: {
      name: username,
      intro: 'Reset Your Password',
      action: {
        instructions: 'to rest your password , click the button',
        button: {
          color: '#333555',
          text: 'reset password',
          link: passwordResetURL
        }
      },
      outro: 'need help then mail to this email'
    }
  };
};

export { userVerificationMailgenContent, forgotPasswordMailgenContent };
