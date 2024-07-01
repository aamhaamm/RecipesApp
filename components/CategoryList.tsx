import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Text } from './Themed';

interface CategoryListProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { name: 'All', image: require('@/assets/images/all.png') },
    { name: 'Salad', image: require('@/assets/images/Salad.jpg') },
    { name: 'Beef', image: require('@/assets/images/beef.jpg') },
    { name: 'Chicken', image: require('@/assets/images/Chicken.jpg') },
    { name: 'Seafood', image: require('@/assets/images/Seafood.png') },
    { name: 'Pasta', image: require('@/assets/images/Pasta.jpeg') },
    { name: 'Dessert', image: require('@/assets/images/Dessert.png') },
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.category,
            selectedCategory === category.name && styles.selectedCategory,
          ]}
          onPress={() => setSelectedCategory(category.name)}
        >
          <Image source={category.image} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
  },
});

export default CategoryList;
