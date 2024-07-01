import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Recipe, RecipeCard } from './RecipeCard';
import { Text } from './Themed';

interface RecipeListProps {
  recipes: Recipe[];
  favoriteRecipes: Recipe[];
  setSelectedRecipe: (recipe: Recipe | null) => void;
  toggleFavorite: (recipe: Recipe) => void;
  handleDelete: (recipeId: string) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, favoriteRecipes, setSelectedRecipe, toggleFavorite, handleDelete }) => {
  return (
    <View style={styles.recipesContainer}>
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            isFavorite={favoriteRecipes.find(r => r.name === recipe.name) !== undefined}
            onPress={() => setSelectedRecipe(recipe)}
            onToggleFavorite={() => toggleFavorite(recipe)}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <Text>No recipes found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  recipesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default RecipeList;
