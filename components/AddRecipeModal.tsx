import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Modal, TouchableOpacity, Text, ScrollView, Button } from 'react-native';
import { db, auth } from '@/firebaseConfig';
import { doc, setDoc, collection } from 'firebase/firestore';
import { Recipe } from '@/components/RecipeCard';

type AddRecipeModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onRecipeAdded: (recipe: Recipe) => void;
};

export default function AddRecipeModal({ isVisible, onClose, onRecipeAdded }: AddRecipeModalProps) {
  const [newRecipe, setNewRecipe] = useState<Omit<Recipe, 'id' | 'isFavorite' | 'userId'>>({
    name: '',
    details: [],
    time: '',
    servings: '',
    calories: '',
    difficulty: 'Easy',
    ingredients: [],
    steps: [],
    categories: ['All'],
    image: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleAddRecipe = async () => {
    // Check for empty fields
    const newErrors: { [key: string]: boolean } = {};
    Object.keys(newRecipe).forEach((key) => {
      if (!newRecipe[key as keyof typeof newRecipe] || (Array.isArray(newRecipe[key as keyof typeof newRecipe]) && newRecipe[key as keyof typeof newRecipe].length === 0)) {
        newErrors[key] = true;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const newRecipeRef = doc(collection(db, 'recipes'));
      const userId = auth.currentUser?.uid || '';
      await setDoc(newRecipeRef, { ...newRecipe, userId });
      onRecipeAdded({ ...newRecipe, id: newRecipeRef.id, isFavorite: false, userId } as Recipe);
      onClose();
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add New Recipe</Text>
        <TextInput
          style={[styles.input, errors.name && styles.errorInput]}
          placeholder="Recipe Name (e.g., Spaghetti Carbonara)"
          value={newRecipe.name}
          onChangeText={(text) => setNewRecipe({ ...newRecipe, name: text })}
        />
        <TextInput
          style={[styles.input, errors.details && styles.errorInput]}
          placeholder="Details (e.g., Italian pasta dish)"
          value={newRecipe.details.join(', ')}
          onChangeText={(text) => setNewRecipe({ ...newRecipe, details: text.split(', ') })}
        />
        <TextInput
          style={[styles.input, errors.time && styles.errorInput]}
          placeholder="Time (minutes, e.g., 30)"
          value={newRecipe.time}
          onChangeText={(text) => setNewRecipe({ ...newRecipe, time: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, errors.servings && styles.errorInput]}
          placeholder="Servings (e.g., 2)"
          value={newRecipe.servings}
          onChangeText={(text) => setNewRecipe({ ...newRecipe, servings: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, errors.calories && styles.errorInput]}
          placeholder="Calories (e.g., 400)"
          value={newRecipe.calories}
          onChangeText={(text) => setNewRecipe({ ...newRecipe, calories: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, errors.ingredients && styles.errorInput]}
          placeholder="Ingredients (e.g., 200g Spaghetti, 100g Pancetta)"
          value={newRecipe.ingredients.join(', ')}
          onChangeText={(text) => setNewRecipe({ ...newRecipe, ingredients: text.split(', ') })}
        />
        <TextInput
          style={[styles.input, errors.steps && styles.errorInput]}
          placeholder="Steps (e.g., Cook spaghetti, Fry pancetta)"
          value={newRecipe.steps.join(', ')}
          onChangeText={(text) => setNewRecipe({ ...newRecipe, steps: text.split(', ') })}
        />
        <TextInput
          style={[styles.input, errors.categories && styles.errorInput]}
          placeholder="Categories (e.g., Pasta, Italian)"
          value={newRecipe.categories.join(', ')}
          onChangeText={(text) => setNewRecipe({ ...newRecipe, categories: text.split(', ') })}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddRecipe}>
          <Text style={styles.addButtonText}>Add Recipe</Text>
        </TouchableOpacity>
        <Button title="Cancel" onPress={onClose} />
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  addButton: {
    backgroundColor: '#CBE25B',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
