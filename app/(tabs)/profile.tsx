import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Text } from '@/components/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
  photo: any;
  favorites: FavoriteRecipe[];
}

interface FavoriteRecipe {
  name: string;
  image: any;
  isFavorite: boolean;
}

export default function ProfileScreen() {
  const [user, setUser] = useState<User>({
    name: 'Abdullah Al Matawah',
    phone: '966558762415',
    email: 'abdullaham1422@gmail.com',
    password: '******',
    photo: require('@/assets/images/profile.png'),
    favorites: [
      { name: 'Beef and Mustard Pie', image: require('@/assets/images/beef_pie.jpg'), isFavorite: true },
      { name: 'Beef and Oyster pie', image: require('@/assets/images/oyster_pie.jpg'), isFavorite: true },
    ],
  });

  const [expandedRecipe, setExpandedRecipe] = useState<FavoriteRecipe | null>(null);

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
        <Ionicons name="call-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={user.phone}
          editable={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={user.email}
          editable={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={user.password}
          editable={false}
          secureTextEntry
        />
      </View>
      <Text style={styles.sectionTitle}>Favorite Recipes</Text>
      <View style={styles.favoritesContainer}>
        {user.favorites.map((recipe, index) => (
          <TouchableOpacity key={index} style={styles.recipeCard} onPress={() => setExpandedRecipe(recipe)}>
            <Image source={recipe.image} style={styles.recipeImage} />
            <Text style={styles.recipeText}>{recipe.name}</Text>
            <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(index)}>
              <FontAwesome name="heart" size={24} color={recipe.isFavorite ? "#F00" : "#CCC"} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {expandedRecipe && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!expandedRecipe}
          onRequestClose={() => setExpandedRecipe(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setExpandedRecipe(null)} style={styles.closeButton}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Image source={expandedRecipe.image} style={styles.modalImage} />
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{expandedRecipe.name}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(user.favorites.indexOf(expandedRecipe))}>
                  <FontAwesome name="heart" size={24} color={expandedRecipe.isFavorite ? "#F00" : "#CCC"} />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalText}>
                1kg Beef, 2 tbs Plain Flour, 2 tbs Rapeseed Oil, 400ml Beef Stock
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#F5F5DC', 
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
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
    closeButton: {
      position: 'absolute',
      top: 10,
      left: 10,
    },
    modalImage: {
      width: '100%',
      height: 200,
      borderRadius: 10,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginTop: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
    },
    modalText: {
      fontSize: 14,
      color: '#000',
      marginTop: 10,
    },
});
