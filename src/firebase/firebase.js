import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCT2I-EZkT-HU_UPnDnNojdYOOKkEb5EZk",
  authDomain: "insta-clone-f3488.firebaseapp.com",
  projectId: "insta-clone-f3488",
  storageBucket: "insta-clone-f3488.appspot.com",
  messagingSenderId: "251588279774",
  appId: "1:251588279774:web:2dfdfba9b312b39d70714f",
  measurementId: "G-KCQF8Z55WK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
