import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';




const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain:process.env.REACT_APP_FIREBASE_AUTH,
    projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL:process.env.REACT_APP_FIREBASE_DATABASE_URL,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGE,
    messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING,
    appId:process.env.REACT_APP_FIREBASE_APP_ID,
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  

  const firebaseAuth = new firebase.auth();
  const firestore = new firebase.firestore();
  const user = firebaseAuth.currentUser;

  export {firebaseAuth, firestore, user };