import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Image, View, TextInput, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RecipeCard, { Recipe } from '@/components/RecipeCard';
import { fetchRecipes } from '@/components/firestoreService';

export default function MainScreen({ navigation }) {
  const [search, setSearch] = useState<string>('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const loadRecipes = async () => {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
    };
    loadRecipes();
  }, []);

  const toggleFavorite = (recipe: Recipe) => {
    if (favoriteRecipes.find(r => r.name === recipe.name)) {
      setFavoriteRecipes(favoriteRecipes.filter(item => item.name !== recipe.name));
    } else {
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image source={require('@/assets/images/profile.png')} style={styles.profileImage} />
            <Text style={styles.greeting}>Hello Abdullah</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('profile', { favoriteRecipes })}>
            <Ionicons name="log-out-outline" size={25} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>
          Make your own food, <Text style={styles.highlight}>stay at home</Text>
        </Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#000" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search any recipe"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {[
            { name: 'Beef', image: require('@/assets/images/beef.jpg') },
            { name: 'Chicken', image: require('@/assets/images/Chicken.jpg') },
            { name: 'Dessert', image: require('@/assets/images/Dessert.png') },
            { name: 'Lamb', image: require('@/assets/images/Lamb.jpg') },
            { name: 'Miscellaneous', image: require('@/assets/images/Miscellaneous.jpeg') },
          ].map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.category, 
                selectedCategory === category.name && styles.selectedCategory
              ]} 
              onPress={() => setSelectedCategory(category.name)}
            >
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>Recipes</Text>
        <View style={styles.recipesContainer}>
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              isFavorite={favoriteRecipes.find(r => r.name === recipe.name) !== undefined}
              onPress={() => setSelectedRecipe(recipe)}
              onToggleFavorite={() => toggleFavorite(recipe)}
            />
          ))}
        </View>
      </ScrollView>

      {selectedRecipe && (
        <Modal visible={true} transparent={true}>
          <Pressable style={styles.modalContainer} onPress={() => setSelectedRecipe(null)}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Pressable onPress={() => setSelectedRecipe(null)} style={styles.backButton}>
                    <Ionicons name="arrow-back-outline" size={25} color="#000" />
                  </Pressable>
                  <Pressable onPress={() => toggleFavorite(selectedRecipe)} style={styles.favoriteButton}>
                    <Ionicons name={favoriteRecipes.find(r => r.name === selectedRecipe.name) ? "heart" : "heart-outline"} size={25} color={favoriteRecipes.find(r => r.name === selectedRecipe.name) ? "#ff0000" : "#000"} />
                  </Pressable>
                </View>
                <Image source={{ uri: selectedRecipe.image }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedRecipe.name}</Text>
                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                    <FontAwesome name="clock-o" size={16} color="#333" />
                    <Text style={styles.detailText}>{selectedRecipe.time}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <FontAwesome name="users" size={16} color="#333" />
                    <Text style={styles.detailText}>{selectedRecipe.servings}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <FontAwesome name="fire" size={16} color="#333" />
                    <Text style={styles.detailText}>{selectedRecipe.calories}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <FontAwesome name="check-circle" size={16} color="#333" />
                    <Text style={styles.detailText}>{selectedRecipe.difficulty}</Text>
                  </View>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Ingredients</Text>
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredientText}>
                      {`\u2022 ${ingredient}`}
                    </Text>
                  ))}
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Steps</Text>
                  {selectedRecipe.steps.map((step, index) => (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingTop: 40,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  highlight: {
    color: '#CBE25B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  category: {
    alignItems: 'center',
    marginRight: 15,
    padding: 8,
    borderRadius: 10,
  },
  selectedCategory: {
    backgroundColor: '#CBE25B',
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  recipesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
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
