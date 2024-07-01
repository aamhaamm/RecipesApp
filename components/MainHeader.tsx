import React from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { Text } from './Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface MainHeaderProps {
  userName: string;
  onSignOut: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ userName, onSignOut }) => {
  return (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <Image source={require('@/assets/images/profile.png')} style={styles.profileImage} />
        <Text style={styles.greeting}>Hello</Text>
        <Text style={styles.username}>{userName}</Text>
      </View>
      <Pressable onPress={onSignOut} style={styles.signOutButton}>
        <Ionicons name="log-out-outline" size={25} color="#000" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingTop: 40,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CBE25B',
  },
  username: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },
  signOutButton: {
    padding: 10,
  },
});

export default MainHeader;
