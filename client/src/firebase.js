import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATaQ9PqzMOXUeI_CrgiZOy7EwPUfNx67k",
  authDomain: "fitness-tracker-app-38d0e.firebaseapp.com",
  projectId: "fitness-tracker-app-38d0e",
  storageBucket: "fitness-tracker-app-38d0e.firebasestorage.app",
  messagingSenderId: "75595928093",
  appId: "1:75595928093:web:cafd5ff8c379664c92ecf4",
  measurementId: "G-0CGT6YM6CV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
