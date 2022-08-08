import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDSrxwdfZE4VoUhH5A8uxtmB-W9pl4n5bA",
    authDomain: "lunch-train-7b7d9.firebaseapp.com",
    projectId: "lunch-train-7b7d9",
    storageBucket: "lunch-train-7b7d9.appspot.com",
    messagingSenderId: "963515759558",
    appId: "1:963515759558:web:d9e619875e1b5cf2ae50c7",
    measurementId: "G-PHH2VBR84K"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);