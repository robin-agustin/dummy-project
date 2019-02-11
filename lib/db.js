import firebase from 'firebase/app';
import 'firebase/firestore'

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

// export function loadDB() {
//   try {
//     var config = {
//       apiKey: process.env.FIREBASE_API_KEY,
//       authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//       databaseURL: process.env.FIREBASE_DATABASE_URL,
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//       messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
//     }

//     firebase.initializeApp(config)
    
//   } catch (err) {
//     if (!/already exists/.test(err.message)) {
//       console.error('Firebase initialization error', err.stack)
//     }
//   }

//     return firebase
// }