import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export interface Recipe {
  name: string;
  image: string;
  details: string[];
  time: string;
  servings: string;
  calories: string;
  difficulty: string;
  ingredients: string[];
  steps: string[];
  isFavorite: boolean;
}

export const fetchRecipes = async (): Promise<Recipe[]> => {
  try {
    const recipesCol = collection(db, 'Recipes');
    const recipeSnapshot = await getDocs(recipesCol);
    const recipeList = recipeSnapshot.docs.map(doc => doc.data() as Recipe);
    return recipeList;
  } catch (error) {
    console.error("Error fetching recipes: ", error);
    return [];
  }
};
