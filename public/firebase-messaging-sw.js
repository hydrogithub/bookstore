importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDSFCCK6XLNymVH_1PRnDrMIt1XVN0Re2c",
  authDomain: "clound-message-88bf0.firebaseapp.com",
  databaseURL: "https://clound-message-88bf0.firebaseio.com",
  projectId: "clound-message-88bf0",
  storageBucket: "clound-message-88bf0.appspot.com",
  messagingSenderId: "1019276616633",
  appId: "1:1019276616633:web:b86bccdd82bf9f8aef0c68",
  measurementId: "G-4H91V84NYF",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
