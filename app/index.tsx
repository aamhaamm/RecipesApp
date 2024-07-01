import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Animated, View, ActivityIndicator, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Themed';
import { auth, db } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import ErrorMessage from '@/components/ErrorMessage';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle user sign-in
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch additional user information from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User data:', userData);
      }

      setError(null);
      router.push('/main');
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = getErrorMessage((error as any).code);
        setError(errorMessage);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Map Firebase error codes to user-friendly messages
  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/user-disabled':
        return 'This user has been disabled.';
      case 'auth/user-not-found':
        return 'There is no user corresponding to this email.';
      case 'auth/wrong-password':
        return 'The password is incorrect.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  };

  // Animation for heartbeat effect
  const scaleValue = new Animated.Value(1);
  const startHeartbeat = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startHeartbeat();
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Welcome to Recipes Maker</Text>
          <Animated.Image
            source={require('@/assets/images/logo.png')}
            style={[styles.image, { transform: [{ scale: scaleValue }] }]}
          />
        </View>
        <View style={styles.bottomContainer}>
          <InputField
            icon="mail-outline"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <InputField
            icon="lock-closed-outline"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error && <ErrorMessage message={error} />}
          {loading ? (
            <ActivityIndicator size="large" color="#CBE25B" />
          ) : (
            <CustomButton title="Sign In" onPress={handleSignIn} />
          )}
          <Pressable style={styles.link} onPress={() => router.push('/signup')}>
            <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
          </Pressable>
          <Text style={styles.note}>Note: This app is designed for use on a phone. For the best experience, please use a phone platform.</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CBE25B',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    marginVertical: 50,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: -20,
    marginBottom: 20,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    marginTop: 30,
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
});
