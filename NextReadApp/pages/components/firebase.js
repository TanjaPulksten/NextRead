import React from 'react';
import* as  firebase from 'firebase';

const firebaseConfig = {
  apiKey: "FIREBASE_CONFIG",
  authDomain: "FIREBASE_CONFIG",
  databaseURL:"FIREBASE_CONFIG",
  projectId: "FIREBASE_CONFIG",
  storageBucket: "FIREBASE_CONFIG",
  messagingSenderId: "FIREBASE_CONFIG",
  appId: "FIREBASE_CONFIG"
  };


export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
