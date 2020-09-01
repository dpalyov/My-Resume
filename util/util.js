const nodemailer = require('nodemailer');

const sendMail = (subject, sender, mail, fname, lname) => {
    const email = process.env.USER;
    const password = process.env.PASS;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: email,
            pass: password,
        },
    });

    const mailOpts = {
        from: email,
        to: "palyov.dimitar@gmail.com",
        subject: subject,
        text: `Sender names: ${fname} ${lname}\nSender email: ${sender}\nMessage:${mail}`,
    };

    const getDeliveryStatus = (error, info) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(`Message sent ${info.messageId}`);
    };

    transporter.sendMail(mailOpts, getDeliveryStatus, (err, info) => {
        if (err) return err;
        else return info;
    });
};

module.exports = {
    sendMail: sendMail,
}