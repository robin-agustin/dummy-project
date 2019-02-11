import firebase from '@firebase/app';
require('@firebase/firestore');

export function loadDB() {
  try {
    var config = {
      apiKey: "AIzaSyBWZXr_5qiGe1tVL3Ssf3FqnwlvIvIM4_U",
      authDomain: "dummy-app-59bf5.firebaseapp.com",
      databaseURL: "https://dummy-app-59bf5.firebaseio.com",
      projectId: "dummy-app-59bf5",
      storageBucket: "dummy-app-59bf5.appspot.com",
      messagingSenderId: "42952393941"
    };
    firebase.initializeApp(config);
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

  return firebase;
}

