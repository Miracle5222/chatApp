import firebase from "firebase/app";
import "firebase/auth";


export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyAwdQT6W0W0UR1QNt8S5rkDoYUOb7xAko8",
    authDomain: "unichat-492cb.firebaseapp.com",
    projectId: "unichat-492cb",
    storageBucket: "unichat-492cb.appspot.com",
    messagingSenderId: "477464433783",
    appId: "1:477464433783:web:7cb2fa82c0aac0aa662272",
  })
  .auth();
