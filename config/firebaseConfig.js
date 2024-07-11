// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXTJS_PUBLIC_FIREBASE_API_KEY,
  authDomain: "meetingscheduler-c66e2.firebaseapp.com",
  projectId: "meetingscheduler-c66e2",
  storageBucket: "meetingscheduler-c66e2.appspot.com",
  messagingSenderId: "128094240973",
  appId: "1:128094240973:web:8695a148b9eb7e30262984",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
