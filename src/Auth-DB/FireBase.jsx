import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5ONwvN_jDPowDGmKEnZk0INu0uV_Hw-w",
  authDomain: "voltedge-auth.firebaseapp.com",
  projectId: "voltedge-auth",
  storageBucket: "voltedge-auth.firebasestorage.app",
  messagingSenderId: "549376874817",
  appId: "1:549376874817:web:84d6529cf7ffa5c3e2a9c0",
  measurementId: "G-746CVJM83L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};
