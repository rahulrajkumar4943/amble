// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat/app";
import { initializeApp,} from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, getDocs, doc, getDoc, query } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
//import '@firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const storage = getStorage(app)








const auth = getAuth()
export { auth, app, db, storage, ref, uploadBytes, getDownloadURL };

