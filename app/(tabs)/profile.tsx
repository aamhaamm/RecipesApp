import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Image, View, TextInput, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@/components/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RecipeCard, { Recipe, exampleRecipes } from '@/components/RecipeCard';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: 'Abdullah Al Matawah',
    email: '',
    password: '******',
    photo: require('@/assets/images/profile.png'),
    favorites: exampleRecipes.map(recipe => ({
      ...recipe,
      isFavorite: true,
    })),
  });

  const [expandedRecipe, setExpandedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser((prevUser) => ({
          ...prevUser,
          email: firebaseUser.email || '',
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = (index: number) => {
    const updatedFavorites = [...user.favorites];
    updatedFavorites[index].isFavorite = !updatedFavorites[index].isFavorite;
    setUser({ ...user, favorites: updatedFavorites });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.profileTitle}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={user.photo} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={user.email}
          editable={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={user.password}
          editable={false}
          secureTextEntry
        />
        <Ionicons name="create-outline" size={20} color="#000" style={styles.changeIcon} />
      </View>
      <Text style={styles.sectionTitle}>Favorite Recipes</Text>
      <View style={styles.favoritesContainer}>
        {user.favorites.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            isFavorite={recipe.isFavorite}
            onPress={() => setExpandedRecipe(recipe)}
            onToggleFavorite={() => toggleFavorite(index)}
          />
        ))}
      </View>

      {expandedRecipe && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!expandedRecipe}
          onRequestClose={() => setExpandedRecipe(null)}
        >
          <Pressable style={styles.modalContainer} onPress={() => setExpandedRecipe(null)}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Pressable onPress={() => setExpandedRecipe(null)} style={styles.closeButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                  </Pressable>
                  <Pressable onPress={() => toggleFavorite(user.favorites.indexOf(expandedRecipe))}>
                    <FontAwesome name="heart" size={24} color={expandedRecipe.isFavorite ? "#F00" : "#CCC"} />
                  </Pressable>
                </View>
                <Image source={expandedRecipe.image} style={styles.modalImage} />
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
                  {expandedRecipe.ingredients.map((ingredient: any, index: React.Key | null | undefined) => (
                    <Text key={index} style={styles.ingredientText}>
                      {`\u2022 ${ingredient}`}
                    </Text>
                  ))}
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Steps</Text>
                  {expandedRecipe.steps.map((step: string, index: number) => (
                    <Text key={index} style={styles.stepText}>
                      {`${index + 1}. ${step}`}
                    </Text>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  changeIcon: {
    marginLeft: 10,
  },
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
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
  closeButton: {
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
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  sectionContainer: {
    marginVertical: 10,
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