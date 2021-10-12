import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
 
const config = {
    apiKey: "AIzaSyCqx_MVl0clBGV4NVDmVq7egSJSHZFAES0",
    authDomain: "ps14-da3a1.firebaseapp.com",
    projectId: "ps14-da3a1",
    storageBucket: "ps14-da3a1.appspot.com",
    messagingSenderId: "474011809198",
    appId: "1:474011809198:web:21f4b977ddf545196f843f",
    measurementId: "G-ZG0DWW4WMJ"
  };
  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
 // export const roomRef=firebase.firestore().collection("dashboard-info");
  
 // const res = await db.collection('dashboard-info').doc('abc').set(data);

export default firebase;