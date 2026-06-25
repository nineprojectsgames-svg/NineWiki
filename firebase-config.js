// firebase-config.js (versión compat, sin import)
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

// Inicializar Firebase (usando la variable global 'firebase' de los scripts compat)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();