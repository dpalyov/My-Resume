import path from 'path';
import {default as fsWithCallbacks} from 'fs';
import {logger} from "../../util/util";
const fs = fsWithCallbacks.promises;


export default async (req, res) => {
    const { collection } = req.query;
    try{
        const docPath = path.resolve(__dirname, "collections", `${collection}.json`);
        const bytes = await fs.readFile(docPath);
        const array = Array.from(JSON.parse(bytes.toString("utf-8")));
        return res.status(200).json(array);

    }
    catch(ex) {
        logger("error", ex.message, process.env.VERCEL_GITHUB_REPO);
        return res.status(500).send("Sorry, it appears that the service is unavailable");
    }
  
};