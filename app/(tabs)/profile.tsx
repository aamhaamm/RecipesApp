import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '@/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useFavorites } from '@/components/FavoritesContext';
import ProfileInfo from '@/components/ProfileInfo';
import FavoriteRecipes from '@/components/FavoriteRecipes';
import RecipeModal from '@/components/RecipeModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '@/components/Themed';
import { Recipe } from '@/components/RecipeCard';

const ProfileScreen = () => {
  const [expandedRecipe, setExpandedRecipe] = useState<Recipe | null>(null);
  const { favoriteRecipes, toggleFavorite } = useFavorites();
  const [user, setUser] = useState({
    name: '',
    email: '',
    photo: require('@/assets/images/profile.png'),
  });

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            name: userData.name,
            email: firebaseUser.email || '',
            photo: require('@/assets/images/profile.png'),
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleToggleFavorite = (recipe: Recipe) => {
    toggleFavorite(recipe);
    if (expandedRecipe && expandedRecipe.name === recipe.name) {
      setExpandedRecipe({ ...expandedRecipe, isFavorite: !expandedRecipe.isFavorite });
    }
  };

  const handleChangePassword = () => {
    router.push('/change-password');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.profileTitle}>Profile</Text>
        <Pressable onPress={handleSignOut} style={styles.signOutButton}>
          <Ionicons name="log-out-outline" size={25} color="#000" />
        </Pressable>
      </View>
      <ProfileInfo user={user} favoriteCount={favoriteRecipes.length} onChangePassword={handleChangePassword} />
      <FavoriteRecipes favoriteRecipes={favoriteRecipes} handleToggleFavorite={handleToggleFavorite} setExpandedRecipe={setExpandedRecipe} />
      <RecipeModal expandedRecipe={expandedRecipe} setExpandedRecipe={setExpandedRecipe} handleToggleFavorite={handleToggleFavorite} favoriteRecipes={favoriteRecipes} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 40,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the profile title
    marginBottom: 20,
  },
  signOutButton: {
    position: 'absolute',
    right: 0, // Position the sign-out button in the right corner
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});

export default ProfileScreen;
