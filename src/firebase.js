// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq1j2LlUyKdWYSVbmOADdHeorXqsiym54",
  authDomain: "netflixsource-75bc5.firebaseapp.com",
  projectId: "netflixsource-75bc5",
  storageBucket: "netflixsource-75bc5.appspot.com",
  messagingSenderId: "401470154061",
  appId: "1:401470154061:web:e848ffda008f1be4834304",
  measurementId: "G-ZPSKSY7TJ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
