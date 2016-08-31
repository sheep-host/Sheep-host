var verify = function(address, string) {
  var transporter;
  var message;

  transporter = nodemailer.createTransport('SMTP', {
    service: 'Mailgun',
    auth: {
      user: 'postmaster@mg.sheep.host',
      pass: '53b1bbc120a88208a58bca3a28b281c2'
    }
  });

  message = {
    from: 'administrator@sheep.host',
    to: address,
    subject: 'It works!!!',
    html: '<h3>To verify your email</h3>\n\nClick the following link: <a href="https://sheep.host/verify/:' + string + '">https://sheep.host/verify/:' + string + '</a>',
  };

  transporter.sendMail(message, function(error, info){
    if (error) throw error;
    transporter.close();
  });
};

module.exports = verify;
