// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5XziEosh9w5ljHN7hSu1N9FTiX_plgyY",
  authDomain: "mediboxcloud.firebaseapp.com",
  databaseURL: "https://mediboxcloud-default-rtdb.firebaseio.com",
  projectId: "mediboxcloud",
  storageBucket: "mediboxcloud.firebasestorage.app",
  messagingSenderId: "929180556933",
  appId: "1:929180556933:web:d3c59e538b8023983953ec",
  measurementId: "G-VZGYR8DHS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;