import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Recipe } from '@/components/RecipeCard';

interface FavoritesContextProps {
  favoriteRecipes: Recipe[];
  toggleFavorite: (recipe: Recipe) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  const toggleFavorite = (recipe: Recipe) => {
    if (favoriteRecipes.find(r => r.name === recipe.name)) {
      setFavoriteRecipes(favoriteRecipes.filter(item => item.name !== recipe.name));
    } else {
      setFavoriteRecipes([...favoriteRecipes, recipe]);
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
