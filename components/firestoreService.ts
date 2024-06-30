import { db } from '@/firebaseConfig';
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
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

export const addUserFavorite = async (userId: string, recipe: Recipe) => {
  try {
    const userFavoritesCol = collection(db, 'users', userId, 'favorites');
    await setDoc(doc(userFavoritesCol, recipe.name), recipe);
    console.log(`Added ${recipe.name} to favorites`);
  } catch (error) {
    console.error("Error adding user favorite: ", error);
    throw new Error("Failed to add favorite");
  }
};

export const removeUserFavorite = async (userId: string, recipeName: string) => {
  try {
    const userFavoritesCol = collection(db, 'users', userId, 'favorites');
    await deleteDoc(doc(userFavoritesCol, recipeName));
    console.log(`Removed ${recipeName} from favorites`);
  } catch (error) {
    console.error("Error removing user favorite: ", error);
    throw new Error("Failed to remove favorite");
  }
};