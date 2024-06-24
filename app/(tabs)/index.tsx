import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, Animated, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '@/components/Themed';

export default function TabOneScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Heartbeat animation value
  const scaleValue = new Animated.Value(1);

  const handleSignIn = () => {
    // Add sign-in logic here
    Alert.alert('Sign In', `Email: ${email}\nPassword: ${password}`);
  };

  // Heartbeat animation
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

  // Start the heartbeat animation on component mount
  useEffect(() => {
    startHeartbeat();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Welcome to Recipes maker</Text>
          <View style={styles.separator} />
          <Animated.Image
            source={require('@/assets/images/logo.png')}
            style={[styles.image, { transform: [{ scale: scaleValue }] }]}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
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
    backgroundColor: '#F5F5DC', // Beige background for top section
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background for bottom section
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000096', // Dark brown color for text
    textShadowColor: 'rgba(0, 0, 0, 0.25)', // Shadow color for text
    textShadowOffset: { width: 2, height: 2 }, // Offset for text shadow
    textShadowRadius: 3, // Radius for text shadow
    marginVertical: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee', // Light separator color
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: -20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row', // Arrange icon and input in a row
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9', // Light background for input
    width: '100%', // Full width
  },
  icon: {
    marginRight: 10, // Space between icon and input
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: '#1e90ff', // Dodger blue color for button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '30%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
