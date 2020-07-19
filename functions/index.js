const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const firebaseRouter = require("./routes/dbRoutes");

require('dotenv').config();

const server = express();

const whitelist = ["https://online-cv-476e2.firebaseapp.com", "https://online-cv-476e2.web.app", "http://localhost:3000"]

server.use(cors({ origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}));

server.use(errorHandler);

server.use("/firebase", firebaseRouter);

server.get("/hello", (req, res) => {
    res.status(400).send("Data");
});

server.post("/signIn", async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log(functions.config())
        const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
                process.env.FIREBASE_API_KEY
            }`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: username,
                    password: password,
                    returnSecureToken: true,
                }),
            }
        );
        const data = await res.json();
        console.log(data)
        // res.sendStatus(200).json({
        //     displayName: data.displayName
        // })
    } catch (error) {
        // res.sendStatus(401).json({
        //     success: false,
        //     message: error.message,
        // });
    }
});

server.post("/signOut", async (req, res) => {
    try {
        if (firebase.auth().currentUser) {
            await firebase.auth().signOut();
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
});

server.post("/handleEmail", (req, res) => {
    const { subject, sender, mail, fname, lname } = req.body;
    sendMail(subject, sender, mail, fname, lname);
    res.send(JSON.stringify(req.body));
});


const sendMail = (subject, sender, mail, fname, lname) => {
    const email = functions.config().gmail.login;
    const password = functions.config().gmail.pass;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
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
        if (error) console.log(error);
        console.log(`Message sent ${info.messageId}`);
    };

    transporter.sendMail(mailOpts, getDeliveryStatus, (err, info) => {
        if (err) return err;
        else return info;
    });
};

// exports.onDataAdded = functions.firestore
//     .document("emails/{sessionId}")
//     .onCreate((snap, context) => {
//         const createdData = snap.data();
//         var { mail, fname, lname, sender, subject } = createdData;
//         sendMail(subject, sender, mail, fname, lname);
//     });

exports.api = functions.https.onRequest(server);
