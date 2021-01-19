import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDiNlST-9jMavEh2aJkVQ_F6JndtWfHs90",
    authDomain: "instrukcije-a1f44.firebaseapp.com",
    projectId: "instrukcije-a1f44",
    storageBucket: "instrukcije-a1f44.appspot.com",
    messagingSenderId: "418498443353",
    appId: "1:418498443353:web:7c46a65f1d6649664f1948"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore();

  export  { firebase, db };
