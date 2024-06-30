import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Recipe } from '@/components/RecipeCard';
import { fetchUserFavorites, addUserFavorite, removeUserFavorite } from '@/components/firestoreService';
import { auth } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

interface FavoritesContextProps {
  favoriteRecipes: Recipe[];
  toggleFavorite: (recipe: Recipe) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUserId(firebaseUser.uid);
        const userFavorites = await fetchUserFavorites(firebaseUser.uid);
        setFavoriteRecipes(userFavorites);
      } else {
        setUserId(null);
        setFavoriteRecipes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = async (recipe: Recipe) => {
    const isFavorite = favoriteRecipes.some(r => r.name === recipe.name);

    if (userId) {
      try {
        if (isFavorite) {
          await removeUserFavorite(userId, recipe.name);
          setFavoriteRecipes(favoriteRecipes.filter(item => item.name !== recipe.name));
        } else {
          await addUserFavorite(userId, recipe);
          setFavoriteRecipes([...favoriteRecipes, recipe]);
        }
        console.log("Favorites updated successfully in the database.");
      } catch (error) {
        console.error("Failed to update favorites in the database", error);
      }
    } else {
      console.log("No user ID found, updating local state only.");
      if (isFavorite) {
        setFavoriteRecipes(favoriteRecipes.filter(item => item.name !== recipe.name));
      } else {
        setFavoriteRecipes([...favoriteRecipes, recipe]);
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteRecipes, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};