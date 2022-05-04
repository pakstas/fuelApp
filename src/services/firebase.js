// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwpMSrAe6Onbk0LuW_enoWBhnQ8HPRLsA",
  authDomain: "fuelapp-8bf89.firebaseapp.com",
  databaseURL: "https://fuelapp-8bf89.firebaseio.com",
  projectId: "fuelapp-8bf89",
  storageBucket: "fuelapp-8bf89.appspot.com",
  messagingSenderId: "292667226133",
  appId: "1:292667226133:web:bad145e1d927724c52b61c",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app;
