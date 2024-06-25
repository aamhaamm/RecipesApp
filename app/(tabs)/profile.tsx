// app/(tabs)/ProfileScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: 'Abdullah',
    phone: '96655872415',
    email: 'abdullaham1422@gmail.com',
    password: '******',
    photo: require('@/assets/images/profile.png'),
  });

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#F5F5DC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 20,
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
});
