const { Router } = require("express");
const { signInWithPhoneNumber } = require("firebase/auth");
// const {
//   app,
//   auth,
//   getAuthToken,
// } = require("../services/commercetools/demoService");
const firebase = require("firebase");
const { productRoutes } = require("./products.routes");
const nodemailer = require("nodemailer");

const router = Router();

router.get("/", (req, res) => {
  // Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    // Message object
    let message = {
        from: 'midhun.nair@krishtechnolabs.com',
        to: 'itsmidhunnair@gmail.com',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});
  res.send("<h1>Hello World</h1>");
});

// router.get("/auth", getAuthToken);
// router.get("/product", productRoutes);

module.exports = router;
