import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import RecipeCard, { Recipe } from '@/components/RecipeCard';

// FavoriteRecipes component to display a list of favorite recipes
const FavoriteRecipes = ({ favoriteRecipes, handleToggleFavorite, setExpandedRecipe }: { favoriteRecipes: Recipe[], handleToggleFavorite: (recipe: Recipe) => void, setExpandedRecipe: (recipe: Recipe) => void }) => {
  return (
    <>
      <Text style={styles.sectionTitle}>Favorite Recipes</Text>
      <View style={styles.favoritesContainer}>
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              isFavorite={true}
              onPress={() => setExpandedRecipe(recipe)}
              onToggleFavorite={() => handleToggleFavorite(recipe)}
            />
          ))
        ) : (
          <Text>No favorite recipes found.</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#000',
  },
  favoritesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default FavoriteRecipes;
