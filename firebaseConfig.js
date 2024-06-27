import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1Shm75Q8y23PcWOj514kHDFXPk76n5oY",
  authDomain: "recipesapp-17a88.firebaseapp.com",
  projectId: "recipesapp-17a88",
  storageBucket: "recipesapp-17a88.appspot.com",
  messagingSenderId: "1061430021445",
  appId: "1:1061430021445:web:5836f5c352dd5eb0a5022c",
  measurementId: "G-QV8KWDBP99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };