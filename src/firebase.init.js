const firebase = require("firebase/app");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREABASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREABASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREABASE_APP_ID
  };


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const expCollection = db.collection('/experience');
export const quotesCollection = db.collection('/quotes');
export const educationCollection = db.collection('/education');