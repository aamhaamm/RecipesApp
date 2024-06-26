import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, Image } from 'react-native';
import { Text } from '@/components/Themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { db, auth } from '@/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';

// Define the Recipe interface
export interface Recipe {
  categories: any;
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
  id: string;
  userId: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  onDelete: (recipeId: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isFavorite, onPress, onToggleFavorite, onDelete }) => {
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.9)).current;

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

  useEffect(() => {
    Animated.parallel([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'recipes', recipe.id));
      onDelete(recipe.id);
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    }
  };

  return (
    <Animated.View style={[styles.recipeCard, { transform: [{ translateY }], opacity }]}>
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <Animated.Image
          source={{ uri: recipe.image }}
          style={[styles.recipeImage, { opacity: imageOpacity, transform: [{ scale: imageScale }] }]}
        />
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          <FontAwesome name="heart" size={24} color={isFavorite ? "#F00" : "#CCC"} />
        </TouchableOpacity>
        {auth.currentUser?.uid === recipe.userId && (
          <TouchableOpacity
            style={styles.deleteIcon}
            onPress={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <FontAwesome name="trash" size={24} color="#F00" />
          </TouchableOpacity>
        )}
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
};

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
  deleteIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
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

// Export the RecipeCard component and Recipe interface
export { RecipeCard };
