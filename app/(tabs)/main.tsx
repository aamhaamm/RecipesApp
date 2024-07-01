import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Modal, Pressable, ActivityIndicator } from 'react-native';
import { Text } from '@/components/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fetchRecipes } from '@/components/firestoreService';
import { useFavorites } from '@/components/FavoritesContext';
import { auth, db } from '@/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import MainHeader from '@/components/MainHeader';
import RecipeList from '@/components/RecipeList';
import SearchBar from '@/components/SearchBar';
import CategoryList from '@/components/CategoryList';
import RecipeModal from '@/components/RecipeModal';
import { Recipe } from '@/components/RecipeCard';

export default function MainScreen() {
  const [search, setSearch] = useState<string>('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const { favoriteRecipes, toggleFavorite } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    const loadRecipes = async () => {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
      setLoading(false);
    };

    loadRecipes();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const filterRecipes = () => {
    return recipes.filter(recipe => {
      return (
        (selectedCategory === 'All' || recipe.categories.includes(selectedCategory)) &&
        recipe.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#CBE25B" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          {/* Main header component */}
          <MainHeader userName={userName} onSignOut={handleSignOut} />

          {/* Title */}
          <Text style={styles.title}>
            Make your own food, <Text style={styles.highlight}>stay at home</Text>
          </Text>

          {/* Search bar component */}
          <SearchBar search={search} setSearch={setSearch} />

          {/* Category list component */}
          <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

          {/* Recipe list component */}
          <RecipeList
            recipes={filterRecipes()}
            favoriteRecipes={favoriteRecipes}
            setSelectedRecipe={setSelectedRecipe}
            toggleFavorite={toggleFavorite}
          />
        </ScrollView>
      )}
      {selectedRecipe && (
        <RecipeModal
          expandedRecipe={selectedRecipe}
          setExpandedRecipe={setSelectedRecipe}
          handleToggleFavorite={toggleFavorite}
          favoriteRecipes={favoriteRecipes}
        />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  highlight: {
    color: '#CBE25B',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
