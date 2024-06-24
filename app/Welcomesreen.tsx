// src/screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Logo image with rings */}
      <View style={styles.logoContainer}>
        <View style={styles.innerLogoContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
      </View>

      {/* Title and punchline */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Foody</Text>
        <Text style={styles.subtitle}>Food is always right</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f59e0b', // bg-amber-500
    paddingVertical: 10,
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // bg-white/20
    borderRadius: 1000,
    padding: 10,
  },
  innerLogoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)', // bg-white
    borderRadius: 1000,
    padding: 8,
  },
  logo: {
    width: 200,
    height: 200,
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: 2,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
    fontSize: 48, // text-6xl
  },
  subtitle: {
    fontWeight: '500',
    color: 'white',
    letterSpacing: 2,
    fontSize: 18, // text-lg
  },
});
