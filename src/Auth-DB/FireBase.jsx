import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_GOOGLE_AUTH_API}`,
  authDomain: "voltedge-auth.firebaseapp.com",
  projectId: "voltedge-auth",
  storageBucket: "voltedge-auth.firebasestorage.app",
  messagingSenderId: "549376874817",
  appId: "1:549376874817:web:84d6529cf7ffa5c3e2a9c0",
  measurementId: "G-746CVJM83L",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const email = result.user.email;
      const uid = result.user.uid;
      const profilePic = result.user.photoURL;
      localStorage.setItem("email", email);
      localStorage.setItem("uid", uid);
      localStorage.setItem("profilePic", profilePic);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
