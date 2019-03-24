import nodemailer from 'nodemailer';

require('dotenv').config();

const from = '"Shopmate" <info@shopmate.com>';

function setup() {
  return nodemailer.createTransport({
    secure: false,
    service: 'gmail',
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
}

export default function orderConfirmation(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: 'Order confirmation on Shopmate',
    html: `
    <div style="height: 100%; width:100%; font-family: Geneva, Tahoma, sans-serif;">
      <div style="width: 80%; margin: 20px auto">
        <h2>Hello ${user.name},</h2>
        <p>
          Thank you for placing the order on shopmate.
        </p>
        <p>
          This mail is to confirm to you that your order is presently been processed and would get to you
          in a few days.
        </p>
        <p>
          Thank you.
        </p>
      </div>
    </div>
    `
  };

  tranport.sendMail(email);
}
