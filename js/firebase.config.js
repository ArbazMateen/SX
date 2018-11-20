
var config = {
    apiKey: "AIzaSyBHqNUUg5V3-rbRrTNA71FPLKGmvxU2RrY",
    authDomain: "sentinelx-66.firebaseapp.com",
    databaseURL: "https://sentinelx-66.firebaseio.com",
    projectId: "sentinelx-66",
    storageBucket: "sentinelx-66.appspot.com",
    messagingSenderId: "499224980865"
};

firebase.initializeApp(config);

const firestore = firebase.firestore();

// Root, Docs, Fields name
const USERS = "Users";

