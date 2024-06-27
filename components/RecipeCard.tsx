import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Animated } from 'react-native';
import { Text } from '@/components/Themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export interface Recipe {
  isFavorite: any;
  name: string;
  image: any;
  details: string;
  time: string;
  servings: string;
  calories: string;
  difficulty: string;
  ingredients: string[];
  steps: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

const exampleRecipes: Recipe[] = [
  {
    name: 'Beef and Mustard Pie',
    image: require('@/assets/images/beef_pie.jpg'),
    details: '1kg Beef, 2 tbs Plain Flour, 2 tbs Rapeseed Oil, 400ml Beef Stock',
    time: '35 Mins',
    servings: '03 Servings',
    calories: '103 Cal',
    difficulty: 'Easy',
    ingredients: ['1kg Beef', '2 tbs Plain Flour', '2 tbs Rapeseed Oil', '400ml Beef Stock'],
    steps: ['Preheat oven to 200°C', 'Mix ingredients', 'Bake for 45 mins'],
    isFavorite: undefined
  },
  {
    name: 'Beef and Oyster pie',
    image: require('@/assets/images/oyster_pie.jpg'),
    details: '1kg Beef, 2 tbs Plain Flour, 2 tbs Rapeseed Oil, 400ml Beef Stock',
    time: '40 Mins',
    servings: '04 Servings',
    calories: '120 Cal',
    difficulty: 'Medium',
    ingredients: ['1kg Beef', '2 tbs Plain Flour', '2 tbs Rapeseed Oil', '400ml Beef Stock'],
    steps: ['Preheat oven to 200°C', 'Mix ingredients', 'Bake for 45 mins'],
    isFavorite: undefined
  }
];

export default function RecipeCard({ recipe, isFavorite, onPress, onToggleFavorite }: RecipeCardProps) {
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.recipeCard, { transform: [{ translateY }], opacity }]}>
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <Image source={recipe.image} style={styles.recipeImage} />
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          <FontAwesome name="heart" size={24} color={isFavorite ? "#F00" : "#CCC"} />
        </TouchableOpacity>
        <View style={styles.cardContent}>
          <Text style={styles.recipeText}>{recipe.name}</Text>
          <View style={styles.recipeDetails}>
            <View style={styles.detailColumn}>
              <Text style={styles.detailText}>{recipe.time}</Text>
              <Text style={styles.detailText}>{recipe.calories}</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailText}>{recipe.servings}</Text>
              <Text style={styles.detailText}>{recipe.difficulty}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export { exampleRecipes };

const styles = StyleSheet.create({
  recipeCard: {
    width: '48%',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // for shadow on iOS
    shadowOpacity: 0.2, // for shadow on iOS
    shadowRadius: 2, // for shadow on iOS
  },
  touchable: {
    width: '100%',
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
    position: 'relative',
  },
  recipeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  recipeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailColumn: {
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
});