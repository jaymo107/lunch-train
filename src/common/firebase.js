import { initializeApp } from "firebase/app";
import { getMessaging, getToken as getTokenFromFirebase, onMessage } from "firebase/messaging";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDSrxwdfZE4VoUhH5A8uxtmB-W9pl4n5bA",
    authDomain: "lunch-train-7b7d9.firebaseapp.com",
    projectId: "lunch-train-7b7d9",
    storageBucket: "lunch-train-7b7d9.appspot.com",
    messagingSenderId: "963515759558",
    appId: "1:963515759558:web:d9e619875e1b5cf2ae50c7",
    measurementId: "G-PHH2VBR84K"
});

const messaging = getMessaging(firebaseApp);

export const getToken = (setTokenFound) => {
    const vapidKey = 'BL17wxZUvw_t0TLhwPAJIZCF-o997e8cD7WqoJHK0EOoGVJ6blVZjXiH6ZXVzHL3-jrt9wFWPYd7gSVp8z8LnQE';
  return getTokenFromFirebase(messaging, { vapidKey }).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}