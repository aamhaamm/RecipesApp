import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { Text } from '@/components/Themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Recipe {
  name: string;
  image: any;
  details: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export default function RecipeCard({ recipe, isFavorite, onPress, onToggleFavorite }: RecipeCardProps) {
  return (
    <TouchableOpacity style={styles.recipeCard} onPress={onPress}>
      <Image source={recipe.image} style={styles.recipeImage} />
      <Text style={styles.recipeText}>{recipe.name}</Text>
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
      >
        <FontAwesome name="heart" size={24} color={isFavorite ? "#F00" : "#CCC"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  recipeCard: {
    width: '48%',
    marginVertical: 10,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  recipeText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
