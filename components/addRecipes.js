import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { recipes } from "./recipes";
import * as dotenv from "dotenv";

dotenv.config();

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storeRecipes = async () => {
  try {
    for (const recipe of recipes) {
      await addDoc(collection(db, "Recipes"), recipe);
      console.log(`Uploaded recipe: ${recipe.name}`);
    }
    console.log("All recipes uploaded successfully.");
  } catch (error) {
    console.error("Error uploading recipes: ", error);
  }
};

storeRecipes();
