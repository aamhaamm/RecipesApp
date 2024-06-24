import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '@/components/Themed';

export default function TabTwoScreen() {
  const [search, setSearch] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          { name: 'Beef', image: require('@/assets/images/Beef.jpg') },
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
        {[
          { name: 'Beef and Mustard Pie', image: require('@/assets/images/beef_pie.jpg') },
          { name: 'Beef and Oyster pie', image: require('@/assets/images/oyster_pie.jpg') },
          { name: 'Beef and Mustard Pie', image: require('@/assets/images/beef_pie.jpg') },
          { name: 'Beef and Oyster pie', image: require('@/assets/images/oyster_pie.jpg') },
          { name: 'Beef and Mustard Pie', image: require('@/assets/images/beef_pie.jpg') },
          { name: 'Beef and Oyster pie', image: require('@/assets/images/oyster_pie.jpg') },
          { name: 'Beef and Mustard Pie', image: require('@/assets/images/beef_pie.jpg') },
          { name: 'Beef and Oyster pie', image: require('@/assets/images/oyster_pie.jpg') },
          { name: 'Beef and Mustard Pie', image: require('@/assets/images/beef_pie.jpg') },
          { name: 'Beef and Oyster pie', image: require('@/assets/images/oyster_pie.jpg') },
        ].map((recipe, index) => (
          <View key={index} style={styles.recipeCard}>
            <Image source={recipe.image} style={styles.recipeImage} />
            <Text style={styles.recipeText}>{recipe.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5DC',
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
});
