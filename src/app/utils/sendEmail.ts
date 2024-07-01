import nodemailer from 'nodemailer';
// import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'akilinjamam@gmail.com',
      pass: 'ywmofaisstwayczw', // this password is collected from google app password
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'akilinjamam@gmail.com', // sender address
      to,
      subject: 'reset your password within 10 minutes', // Subject line
      text: '', // plain text body
      html,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error);
};
