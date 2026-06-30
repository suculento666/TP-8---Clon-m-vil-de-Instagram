import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO Fase 5: implementar detalle del post (reemplaza el Modal del web)
const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DetailScreen — próximamente 🐾</Text>
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

export default DetailScreen;
