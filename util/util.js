// import { createTransport } from 'nodemailer';
import {default as fsWithCallbacks} from 'fs'
import path from 'path';
import fetch from "node-fetch"

const fs = fsWithCallbacks.promises;

export const sendMail =  async (subject, sender, mail, fname, lname) => {

    const baseUrl = "https://api.smtp2go.com/v3/"

    const mailOpts = {
        "api_key": process.env.SMTP2GO_APIKEY,
        "to": ["palyov.dimitar@gmail.com"],
        "sender": "mail@dpalyov.com",
        "subject": subject,
        // "text_body": `Sender names: ${fname} ${lname}\nSender email: ${sender}\nMessage:${mail}`,
        "html_body": `<h5>${mail}</h5>`,
        "custom_headers": [
          {
            "header": "Reply-To",
            "value": `${fname} ${lname} ${sender}`
          }
        ],
        // "attachments": [
        //     {
        //         "filename": "test.pdf",
        //         "fileblob": "--base64-data--",
        //         "mimetype": "application/pdf"
        //     },
        //     {
        //         "filename": "test.txt",
        //         "fileblob": "--base64-data--",
        //         "mimetype": "text/plain"
        //     }
        // ]
    }


    const res = await fetch(baseUrl + "/email/send", {method: "POST", body: JSON.stringify(mailOpts)});
    const json = await res.json();

    if(json.data.failed){
        await logger("error", JSON.stringify(json), "mailLog");
    }
    else {
        await logger("info", JSON.stringify(json), "mailLog");
    }
};

export async function logger(type, message, destination){

    const tgtDir = path.resolve("logs");
    try{
        await fs.stat(tgtDir);
    }
    catch(error){
        if(error.code === "ENOENT"){
            fs.mkdir(tgtDir);
        }
    }
    await fs.appendFile(path.resolve("logs",`${destination}.txt`), `[${new Date(Date.now()).toISOString()}][${type}] : ${message}\n`);
}