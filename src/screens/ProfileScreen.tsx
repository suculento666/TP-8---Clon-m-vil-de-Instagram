import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO Fase 6: implementar perfil del usuario
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ProfileScreen — próximamente 😸</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;
