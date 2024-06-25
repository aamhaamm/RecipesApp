import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, View, TextInput, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RecipeCard from '@/components/RecipeCard';

interface Recipe {
  name: string;
  image: any;
  details: string;
}

const recipes: Recipe[] = [
  { name: 'Beef and Mustard Pie', image: require('@/assets/images/beef_pie.jpg'), details: '1kg Beef, 2 tbs Plain Flour, 2 tbs Rapeseed Oil, 400ml Beef Stock' },
  { name: 'Beef and Oyster pie', image: require('@/assets/images/oyster_pie.jpg'), details: '1kg Beef, 2 tbs Plain Flour, 2 tbs Rapeseed Oil, 400ml Beef Stock' },
  { name: 'Beef and Oyster pie', image: require('@/assets/images/oyster_pie.jpg'), details: '1kg Beef, 2 tbs Plain Flour, 2 tbs Rapeseed Oil, 400ml Beef Stock' },
  { name: 'Beef and Mustard Pie', image: require('@/assets/images/beef_pie.jpg'), details: '1kg Beef, 2 tbs Plain Flour, 2 tbs Rapeseed Oil, 400ml Beef Stock' },
];

export default function MainScreen() {
  const [search, setSearch] = useState<string>('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);

  const toggleFavorite = (recipe: Recipe) => {
    if (favoriteRecipes.includes(recipe.name)) {
      setFavoriteRecipes(favoriteRecipes.filter(item => item !== recipe.name));
    } else {
      setFavoriteRecipes([...favoriteRecipes, recipe.name]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.header}>
          <Image source={require('@/assets/images/profile.png')} style={styles.profileImage} />
          <Ionicons name="notifications-outline" size={25} color="#000" />
        </View>
        <Text style={styles.greeting}>Hello Abdullah</Text>
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
            <TouchableOpacity key={index} style={styles.category}>
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
              isFavorite={favoriteRecipes.includes(recipe.name)}
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
                    <Ionicons name={favoriteRecipes.includes(selectedRecipe.name) ? "heart" : "heart-outline"} size={25} color={favoriteRecipes.includes(selectedRecipe.name) ? "#ff0000" : "#000"} />
                  </Pressable>
                </View>
                <Image source={selectedRecipe.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedRecipe.name}</Text>
                <Text style={styles.modalDetails}>{selectedRecipe.details}</Text>
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
    backgroundColor: '#F5F5DC',
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  highlight: {
    color: '#FFA726',
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
    marginVertical: 20,
  },
  category: {
    alignItems: 'center',
    marginRight: 20,
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
  modalDetails: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
