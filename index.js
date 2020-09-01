const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const {sendMail} = require("./util/util");
const {logger} = require("./middlewares/requestLogger");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs").promises;

require('dotenv').config();

const server = express();

//register security middlewares

const whitelist = ["http://localhost:3000"]

server.use(cors({ origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}));

server.use(express.urlencoded())
server.use(express.json());
server.use(logger);
server.use("/", express.static("../public/"));
// server.use(express.static("../public/css"));
// server.use(express.static("../public/js"));
// server.use(express.static("../public/media"));

server.use(helmet());

//register other custom middlwares...
server.use(errorHandler);

//routes 
server.get("/hello", (req, res) => {
    res.send("Hi");
});

server.get("/api/data/:collection", async (req, res) => {
    // let { sortField = "id", sortOrder = "asc" } = req.query;
    const { collection } = req.params;
    try{
        const docPath = path.resolve(__dirname, "collections", `${collection}.json`);
        const bytes = await fs.readFile(docPath);
        const array = Array.from(JSON.parse(bytes.toString("utf-8")));
        return res.status(200).json(array);

    }
    catch(ex) {
        return res.status(500).send("Sorry, it appears that the service is unavailable");
    }
  

});

server.post("/api/handleEmail", (req, res) => {
    const { subject, sender, mail, fname, lname } = req.body;
    try{
        sendMail(subject, sender, mail, fname, lname);
        res.send(JSON.stringify(req.body));
    }
    catch(ex){
        res.send(500).send("Failed to send your message");
    }
   
});


server.listen(process.env.PORT || 3002, () => {
    console.log("server running on port " + process.env.PORT);
});

