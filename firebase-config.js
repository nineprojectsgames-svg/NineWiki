// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEcmd_YOI6P71eyMyaWbyj7goZYbqIiBE",
  authDomain: "ninewiki-dc117.firebaseapp.com",
  databaseURL: "https://ninewiki-dc117-default-rtdb.firebaseio.com",
  projectId: "ninewiki-dc117",
  storageBucket: "ninewiki-dc117.firebasestorage.app",
  messagingSenderId: "265680885640",
  appId: "1:265680885640:web:1ea602ba3f8b62c6dd0c3d",
  measurementId: "G-BK192M1JQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);