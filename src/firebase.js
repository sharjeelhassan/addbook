import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCjBUmxcLxNui7nV3zIOLUJ6RqPdY-HmS4",
    authDomain: "cizerra-addbook.firebaseapp.com",
    databaseURL: "https://cizerra-addbook.firebaseio.com",
    projectId: "cizerra-addbook",
    storageBucket: "cizerra-addbook.appspot.com",
    messagingSenderId: "567838627090",
    appId: "1:567838627090:web:d88bae6c39c5323abb8fcb",
    measurementId: "G-L87VJY7YLP"
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();