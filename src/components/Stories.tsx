import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO Fase 4: implementar Stories con ScrollView horizontal
const Stories = () => {
  return (
    <View style={styles.container}>
      <Text>Stories placeholder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default Stories;
