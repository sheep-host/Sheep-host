var nodemailer = require('nodemailer');

var sendMail = (address, string, cb) => {
  var transporter;
  var message;

  transporter = nodemailer.createTransport('SMTP', {
    service: 'Mailgun',
    auth: {
      user: 'postmaster@mg.sheep.host',
      pass: '53b1bbc120a88208a58bca3a28b281c2',
    },
  });

  message = {
    from: 'administrator@sheep.host',
    to: address,
    subject: 'Verification required',
    html: `click the following link to verify your email address: <a href="https://localhost:3000/signup/verify/${string}">https://sheep.host/signup/verify/${string}</a>`,
    // html: `click the following link to verify your email address: <a href="https://sheep.host/signup/verify/${string}">https://sheep.host/signup/verify/${string}</a>`,
  };

  transporter.sendMail(message, (error) => {
    if (error) cb(error, null);
    transporter.close();
    cb(null, 'Verification email sent');
  });
};

module.exports = sendMail;
