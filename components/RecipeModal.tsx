import React from 'react';
import { View, Modal, Pressable, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@/components/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Recipe } from '@/components/RecipeCard';

interface RecipeModalProps {
  expandedRecipe: Recipe | null;
  setExpandedRecipe: (recipe: Recipe | null) => void;
  handleToggleFavorite: (recipe: Recipe) => void;
  favoriteRecipes: Recipe[];
}

const RecipeModal: React.FC<RecipeModalProps> = ({ expandedRecipe, setExpandedRecipe, handleToggleFavorite, favoriteRecipes }) => {
  if (!expandedRecipe) return null;

  return (
    <Modal visible={true} transparent={true}>
      <Pressable style={styles.modalContainer} onPress={() => setExpandedRecipe(null)}>
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setExpandedRecipe(null)} style={styles.backButton}>
                <Ionicons name="arrow-back-outline" size={25} color="#000" />
              </Pressable>
              <Pressable onPress={() => handleToggleFavorite(expandedRecipe)} style={styles.favoriteButton}>
                <Ionicons name={favoriteRecipes.find(r => r.name === expandedRecipe.name) ? "heart" : "heart-outline"} size={25} color={favoriteRecipes.find(r => r.name === expandedRecipe.name) ? "#ff0000" : "#000"} />
              </Pressable>
            </View>
            <Image source={{ uri: expandedRecipe.image }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{expandedRecipe.name}</Text>
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <FontAwesome name="clock-o" size={16} color="#333" />
                <Text style={styles.detailText}>{expandedRecipe.time}</Text>
              </View>
              <View style={styles.detailItem}>
                <FontAwesome name="users" size={16} color="#333" />
                <Text style={styles.detailText}>{expandedRecipe.servings}</Text>
              </View>
              <View style={styles.detailItem}>
                <FontAwesome name="fire" size={16} color="#333" />
                <Text style={styles.detailText}>{expandedRecipe.calories}</Text>
              </View>
              <View style={styles.detailItem}>
                <FontAwesome name="check-circle" size={16} color="#333" />
                <Text style={styles.detailText}>{expandedRecipe.difficulty}</Text>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              <View style={styles.textContainer}>
                {expandedRecipe.ingredients.map((ingredient, index) => (
                  <Text key={index} style={styles.ingredientText}>
                    • {ingredient}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Steps</Text>
              <View style={styles.textContainer}>
                {expandedRecipe.steps.map((step, index) => (
                  <Text key={index} style={styles.stepText}>
                    {index + 1}. {step}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    alignItems: 'flex-start',
  },
  favoriteButton: {
    alignItems: 'flex-end',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  sectionContainer: {
    marginVertical: 10,
    width: '100%', 
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  textContainer: {
    alignItems: 'flex-start', 
  },
  ingredientText: {
    fontSize: 14,
    color: '#333',
  },
  stepText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});

export default RecipeModal;
