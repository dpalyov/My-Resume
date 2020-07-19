const serviceKey = require("./serviceKey.json");
const admin = require("firebase-admin");

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceKey);

const firebaseApp = admin.initializeApp(adminConfig);

module.exports = {
    app: firebaseApp
}