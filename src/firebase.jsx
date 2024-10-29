// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnuh1LfJFzGgfHFFE7i3Czb4bOrLX2sFM",
  authDomain: "biking-platform.firebaseapp.com",
  projectId: "biking-platform",
  storageBucket: "biking-platform.appspot.com",
  messagingSenderId: "363804496861",
  appId: "1:363804496861:web:eed9d3c63bf74e6fd69c34",
  measurementId: "G-Z02C2LZ0SE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);