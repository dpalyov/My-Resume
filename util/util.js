// import { createTransport } from 'nodemailer';
import { default as fsWithCallbacks } from "fs";
import path from "path";
import mandrill from "mandrill-api";

const fs = fsWithCallbacks.promises;
const mandrillClient = new mandrill.Mandrill(process.env.SEND_GRID_APIKEY);

export const sendMail = async (subject, sender, mail, fname, lname) => {
    const msg = {
        html: `<strong>${mail}</strong>`,
        text: "Example text content",
        subject: subject,
        from_email: "mail@dpalyov.com",
        from_name: `${fname} ${lname}`,
        to: [
            {
                email: "mail@dpalyov.com",
                name: "Dimitar Palyov",
                type: "to",
            },
        ],
        headers: {
            "Reply-To": sender,
        },
    };

    mandrillClient.messages.send(
        {"message": msg, "async": true, "ip_pool": "Main Pool"},
        async (res) => {
            await logger("info", JSON.stringify(res), "mailLog");
        },
        async (err) => {
            await logger("error", JSON.stringify(err), "mailLog");
        }
    );
};

export async function logger(type, message, destination) {
    const tgtDir = path.resolve("logs");
    try {
        await fs.stat(tgtDir);
    } catch (error) {
        if (error.code === "ENOENT") {
            fs.mkdir(tgtDir);
        }
    }
    await fs.appendFile(
        path.resolve("logs", `${destination}.txt`),
        `[${new Date(Date.now()).toISOString()}][${type}] : ${message}\n`
    );
}
