const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

// Configure your SMTP transport (use Gmail or your SMTP provider)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saadliwassieol@gmail.com',
        pass: 'Waassim2003@' // Replace this with your actual Gmail App Password
    }
});

exports.sendEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const mailOptions = {
            from: `${req.body.name} <${req.body.email}>`,
            to: 'saadliwassieo@gmail.com', // your receiving email
            subject: 'New message from portfolio website',
            text: req.body.message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send(error.toString());
            }
            return res.status(200).send('Email sent: ' + info.response);
        });
    });
});
