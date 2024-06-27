import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Recipe } from '@/components/RecipeCard';
import { fetchUserFavorites, saveUserFavorites } from '@/components/firestoreService';
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
    let updatedFavorites;
    if (favoriteRecipes.find(r => r.name === recipe.name)) {
      updatedFavorites = favoriteRecipes.filter(item => item.name !== recipe.name);
    } else {
      updatedFavorites = [...favoriteRecipes, recipe];
    }
    setFavoriteRecipes(updatedFavorites);

    if (userId) {
      await saveUserFavorites(userId, updatedFavorites);
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
