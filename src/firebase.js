// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDFjpmNZxEw6HtDC0drs0mo2LEiBECKwAI",
    authDomain: "devhub-auth-d4ff2.firebaseapp.com",
    projectId: "devhub-auth-d4ff2",
    storageBucket: "devhub-auth-d4ff2.firebasestorage.app",
    messagingSenderId: "785486851390",
    appId: "1:785486851390:web:8ba29edeecbcfbc4e1906f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
