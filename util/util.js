import { createTransport } from 'nodemailer';
import {default as fsWithCallbacks} from 'fs'
import path from 'path';

const fs = fsWithCallbacks.promises;

export const sendMail =  (subject, sender, mail, fname, lname) => {
    const email = process.env.USER;
    const password = process.env.PASS;

    const transporter = createTransport({
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

    const getDeliveryStatus = async (error, info) => {
        if (error) {
            await logger("error", error, "mailLog");
            return;
        }
        await logger("info", info.messageId, "mailLog")
    };

    transporter.sendMail(mailOpts, getDeliveryStatus, (err, info) => {
        if (err) return err;
        else return info;
    });
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
    await fs.appendFile(path.resolve("logs",`${destination}.txt`), `[${type}] : ${message}\n`);
}