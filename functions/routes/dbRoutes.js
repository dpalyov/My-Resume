const router = require("express").Router();
const serviceKey = require("../serviceKey.json");
const admin = require("firebase-admin");

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceKey);

admin.initializeApp(adminConfig);

router.get("/data/:collection", async (req, res) => {
    const db = admin.firestore();
    const { sortField = "id", sortOrder = "asc" } = req.query;
    const { collection } = req.params;
    const entity = await db
        .collection(`/${collection}`)
        .orderBy(sortField, sortOrder)
        .get();
    const data = entity.docs.map((d) => d.data());
    return res.status(200).json(data);
});

module.exports = router;
