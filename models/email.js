var nodemailer = require('nodemailer');

module.exports.mailServer = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});
module.exports.form = {
    from: "Server IoT core Te",
    to: " ",
    subject: "Verify ID",
    text: " "
};