var nodemailer = require('nodemailer');

module.exports.mailServer = nodemailer.createTransport({
    //service: 'gmail', https://medium.com/@.jay/sending-email-using-express-js-with-nodemailer-in-heroku-71741f29463c
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL
    }
});
module.exports.form = {
    from: "Server IoT core Te",
    to: " ",
    subject: "Verify ID",
    text: " "
};