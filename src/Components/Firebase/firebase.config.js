// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK3VGd1Bn8dlWMTxIvMk2BsTYTZIiQqac",
  authDomain: "onliupstudy.firebaseapp.com",
  projectId: "onliupstudy",
  storageBucket: "onliupstudy.appspot.com",
  messagingSenderId: "496623466040",
  appId: "1:496623466040:web:df40c2ece73db4b76518cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;