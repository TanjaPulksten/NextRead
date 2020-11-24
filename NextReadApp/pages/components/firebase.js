import React from 'react';
import* as  firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCnI3HYg3LjZaXSR-SQUfE799DgruV4-zM",
  authDomain: "digitaalinen-liiketoiminta.firebaseapp.com",
  databaseURL:"https://digitaalinen-liiketoiminta.firebaseio.com",
  projectId: "digitaalinen-liiketoiminta",
  storageBucket: "digitaalinen-liiketoiminta.appspot.com",
  messagingSenderId: "904233302791",
  appId: "1:904233302791:web:b6b4f8a61cfad677ca23a2"
  };


export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
