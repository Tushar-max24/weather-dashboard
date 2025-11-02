// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// ✅ Your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7yb3XVQGgVAs6qDNzYZv8pUMeN7O0Gnw",
  authDomain: "weather-dashboard-857de.firebaseapp.com",
  projectId: "weather-dashboard-857de",
  storageBucket: "weather-dashboard-857de.firebasestorage.app",
  messagingSenderId: "918845505925",
  appId: "1:918845505925:web:eec07ddeb91999801884ec",
  measurementId: "G-14XTEJPMGF",
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Initialize Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔹 Sign in with Google Popup
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  // Return minimal user info
  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
};

// 🔹 Sign out user
export const signOutUser = async () => {
  await signOut(auth);
};

// 🔹 Export auth instance (optional)
export const getAuthInstance = () => auth;

export default app;
