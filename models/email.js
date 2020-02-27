//---module email to check ID---//
var nodemailer = require('nodemailer');

module.exports.mailServer = nodemailer.createTransport({ // config mail server
    service: 'gmail',
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