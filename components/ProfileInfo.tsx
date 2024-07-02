import React from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ProfileInfoProps {
  user: { name: string; email: string; photo: any; };
  favoriteCount: number;
  onChangePassword: () => void;
}

// ProfileInfo component to display user information
const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, favoriteCount, onChangePassword }) => {
  return (
    <>
      <View style={styles.profileContainer}>
        <Image source={user.photo} style={styles.profileImage} />
        <View style={styles.nameFavoriteContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.favoriteContainer}>
            <Ionicons name="heart" size={20} color="#F00" />
            <Text style={styles.favoriteCount}>{favoriteCount}</Text>
          </View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={user.email}
          editable={false}
        />
      </View>
      <TouchableOpacity onPress={onChangePassword} style={styles.changePasswordButton}>
        <Text style={styles.changePasswordButtonText}>Change Password</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  nameFavoriteContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteCount: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
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
  changePasswordButton: {
    backgroundColor: '#CBE25B', // Update this color to match buttons on other pages
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  changePasswordButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileInfo;
