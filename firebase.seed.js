const firebase = require("firebase/app");
require("firebase/firestore");

var firebaseConfig = {}

 firebase.initializeApp(firebaseConfig);
 const db = firebase.firestore();

 const educationCollection = db.collection('/education');

 const addEducation = () => {

    var docs = [
        {
            dateStart: new Date(2000,9,15),
            dateEnd: new Date(2005,6,20),
            school: "French school Frederic Joliot-Curie, Varna",
            type: "high school"
        },
        {
            dateStart: new Date(2005,9,25),
            dateEnd: new Date(2008,6,23),
            school: "Paul Valery university, Montpellier",
            type: "college"
         }
    ]

    console.log("Added documents:")
    docs.forEach(async (doc) => {
       const docRef = await educationCollection.add(doc);
       console.log(docRef.id);
    });
    
 }

addEducation();
 
