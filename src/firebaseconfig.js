import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrXJwqIhAKC3eqpFlzaMOnxVfDIo4h068",
  authDomain: "blogit-63911.firebaseapp.com",
  projectId: "blogit-63911",
  storageBucket: "blogit-63911.firebasestorage.app",
  messagingSenderId: "378975294879",
  appId: "1:378975294879:web:99533d22171d3203f459aa",
  measurementId: "G-W6ZX8DZP9M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);


const addUser = async (userData) => {
    try {
        const docRef = await addDoc(collection(db, "users"), userData);
        console.log("User added with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding user: ", e);
    }
};


const addblog = async (blogdata) => {
    try {
        const docRef = await addDoc(collection(db, "blog"), blogData);
        console.log("blog added with id:", docRef.id);
    } catch (e) {
        console.error("Error adding blog: ", e);
    }const addblog = async (blogdata) => {
  try {
    const docRef = await addDoc(collection(db, "blog"), blogdata);
    console.log("blog added with id:", docRef.id);
  } catch (e) {
    console.error("Error adding blog: ", e);
  }
};

}

export { auth, googleProvider, signInWithPopup, signOut, storage, db, addUser, addblog, onAuthStateChanged };
