import {sendMail} from "../util/util";

export default function(req, res) {
    const { subject, sender, mail, fname, lname } = req.body;
    try{
        sendMail(subject, sender, mail, fname, lname);
        res.send(JSON.stringify(req.body));
    }
    catch(ex){
        console.log(ex);
        res.send(500).send("Failed to send your message");
    }
   
};