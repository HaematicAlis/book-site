const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ucfbookorders@gmail.com',
    pass: 'jacobtylernathanblaze' // naturally, replace both with your real credentials or an application-specific password
  }
});

const mailOptions = {
  from: 'ucfbookorders@gmail.com',
  to: 'jakesteinebronn@gmail.com',
  subject: 'fddfd test',
  text: 'godfdsfsdfsdfsdfshe fall of man '
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
