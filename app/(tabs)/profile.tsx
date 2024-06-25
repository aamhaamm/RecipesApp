// app/(tabs)/ProfileScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: 'Abdullah Al Matawah',
    phone: '96034 56878',
    email: 'abdullah@example.com',
    password: '******',
    photo: require('@/assets/images/profile.png'),
    favorites: [
      { name: 'Beef and Mustard Pie', image: require('@/assets/images/beef_pie.jpg') },
      { name: 'Beef and Oyster pie', image: require('@/assets/images/oyster_pie.jpg') },
    ],
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={30} color="#F7941D" style={styles.menuIcon} />
        <Text style={styles.profileTitle}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={user.photo} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <Text style={styles.sectionTitle}>Edit profile</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={user.phone}
          editable={false}
        />
        <TouchableOpacity>
          <Ionicons name="pencil-outline" size={20} color="#F7941D" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={user.email}
          editable={false}
        />
        <TouchableOpacity>
          <Ionicons name="pencil-outline" size={20} color="#F7941D" />
        </TouchableOpacity>
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
        <TouchableOpacity>
          <Ionicons name="pencil-outline" size={20} color="#F7941D" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutContainer}>
        <Text style={styles.logoutText}>Logout</Text>
        <Ionicons name="arrow-forward-outline" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsContainer}>
        <Text style={styles.settingsText}>Setting</Text>
        <Ionicons name="arrow-forward-outline" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Favorite Recipes</Text>
      <View style={styles.favoritesContainer}>
        {user.favorites.map((recipe, index) => (
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
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuIcon: {
    marginRight: 10,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F7941D',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
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
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#000',
  },
  settingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  settingsText: {
    fontSize: 16,
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
});
