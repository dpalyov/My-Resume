const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");

admin.initializeApp();

const app = express();
app.use(cors({ origin: ["http://localhost:3000"] }));

app.use(errorHandler);
//routes
app.get("/hello", (req, res) => {
    res.send(`Hello ${req.user.name}`);
});

app.post("/handleEmail", (req, res) => {
    const { subject, sender, mail, fname, lname } = req.body;
    sendMail(subject, sender, mail, fname, lname);
    res.send(JSON.stringify(req.body));
});

app.get("/githubRepos", async (request, response) => {
    const endpoint = "https://api.github.com/graphql";
    const token = functions.config().github.key;
    const query = `query ($numRepos: Int!, $query:String!) {
   
    search(type:REPOSITORY,query: $query, last: $numRepos) {
        nodes {
          ... on Repository {
              languages(first:5) {
               ...on LanguageConnection {
                     nodes {
                    name
                  }
              }
            }
            name
            url
            shortDescriptionHTML
            isArchived
          }
        }
      }
    }
  `;

    const { username, numRepos } = request.query;
    const res = await fetch(endpoint, {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify({
            query: query,
            variables: {
                username: username,
                numRepos: parseInt(numRepos),
                query: `user:${username} is:public archived:false`,
            },
        }),
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

    const json = await res.json();

    response.json(json);
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

// exports.getGithubRepos = functions.https.onRequest(

// exports.handleEmail = functions.https.onRequest((req, res) => {
//     // corsHandler(req, res, async () => {
//     const { subject, sender, mail, fname, lname } = req.body;
//     var result = sendMail(subject, sender, mail, fname, lname);
//     res.send(JSON.stringify(req.body));
//     // console.log(req.body);
// });

// exports.onDataAdded = functions.firestore
//     .document("emails/{sessionId}")
//     .onCreate((snap, context) => {
//         const createdData = snap.data();
//         var { mail, fname, lname, sender, subject } = createdData;
//         sendMail(subject, sender, mail, fname, lname);
//     });

exports.api = functions.https.onRequest(app);
