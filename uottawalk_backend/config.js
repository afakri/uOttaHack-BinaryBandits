const firebase = require("firebase");
const firebaseConfig = {};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
const WeeklyStepProfile = db.collection("WeeklyStepProfile");
module.exports = User;
module.exports = WeeklyStepProfile;
