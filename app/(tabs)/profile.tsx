import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useFavorites } from '@/components/FavoritesContext';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileInfo from '@/components/ProfileInfo';
import FavoriteRecipes from '@/components/FavoriteRecipes';
import RecipeModal from '@/components/RecipeModal';
import { Recipe } from '@/components/RecipeCard';

// ProfileScreen component to display the profile screen
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader />
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
  },
});

export default ProfileScreen;
