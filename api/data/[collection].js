import path from 'path';
import fs from 'fs/promises';


export default async (req, res) => {
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
  
};