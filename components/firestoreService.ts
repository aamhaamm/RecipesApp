import { db } from '@/firebaseConfig';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { Recipe } from '@/components/RecipeCard';

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

export const fetchUserFavorites = async (userId: string): Promise<Recipe[]> => {
  try {
    const userFavoritesCol = collection(db, 'users', userId, 'favorites');
    const favoritesSnapshot = await getDocs(userFavoritesCol);
    const favoritesList = favoritesSnapshot.docs.map(doc => doc.data() as Recipe);
    return favoritesList;
  } catch (error) {
    console.error("Error fetching user favorites: ", error);
    return [];
  }
};

export const saveUserFavorites = async (userId: string, favorites: Recipe[]) => {
  try {
    const userFavoritesCol = collection(db, 'users', userId, 'favorites');
    for (const recipe of favorites) {
      await setDoc(doc(userFavoritesCol, recipe.name), recipe);
    }
  } catch (error) {
    console.error("Error saving user favorites: ", error);
  }
};