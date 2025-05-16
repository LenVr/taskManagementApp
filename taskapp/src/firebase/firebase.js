// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcRjqMz5DjePu5NDhRsh_b__MAWncqtBo",
    authDomain: "taskapp-a5264.firebaseapp.com",
    projectId: "taskapp-a5264",
    storageBucket: "taskapp-a5264.firebasestorage.app",
    messagingSenderId: "599575175621",
    appId: "1:599575175621:web:e94e3a130b5c7a4d076bac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);