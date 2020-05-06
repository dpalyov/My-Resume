const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const firebaseRouter = require('./routes/dbRoutes');


const app = express();
app.use(cors({ origin: true}));
app.use(errorHandler);

app.use('/firebase', firebaseRouter )

app.get("/hello", (req, res) => {
    res.status(400).send("Data")
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
                query: `user:${username} is:public archived:false (:r:) in:description`,
            },
        }),
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

    const json = await res.json();

    response.status(200).json(json.data.search.nodes);
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

exports.api = functions.https.onRequest(app);
