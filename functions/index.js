const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp();

const email = functions.config().gmail.login;
const password = functions.config().gmail.pass;

const sendMail = (subject, sender, mail, fname, lname) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: email,
            pass: password
        }
    });

    const mailOpts = {
        from: email,
        to: "palyov.dimitar@gmail.com",
        subject: subject,
        text: `Sender names: ${fname} ${lname}\nSender email: ${sender}\nMessage:${mail}`

    }

    const getDeliveryStatus = (error, info) => {

        if(error)  console.log(error);
        console.log(`Message sent ${info.messageId}`);
    }

    transporter.sendMail(mailOpts,getDeliveryStatus);
}

const endpoint = 'https://api.github.com/graphql';
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
  `

exports.getGithubRepos = functions.https.onRequest((request, response) => {

      const getRepos = async () => 
      {
          try{
            const res = await fetch(endpoint, 
                {
                    method: 'POST',
                    credentials: 'same-origin', 
                    body: JSON.stringify({
                        query: query, 
                        variables: {username: 'dpalyov', numRepos: 4,query: "user:dpalyov is:public archived:false"}
                    }),
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
      
              const json = await res.json();
      
              response.json(json);
          }
          catch(error){
              response.status(500).send(error)
          }
        }

    getRepos()
});


exports.onDataAdded = functions.firestore.document('emails/{sessionId}').onCreate((snap, context) => {

    const createdData = snap.data();
    var {mail, fname, lname, sender, subject} = createdData
    sendMail(subject, sender, mail, fname, lname);
})