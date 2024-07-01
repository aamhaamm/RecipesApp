import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';

// ProfileHeader component to display the profile header
const ProfileHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.profileTitle}>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ProfileHeader;
