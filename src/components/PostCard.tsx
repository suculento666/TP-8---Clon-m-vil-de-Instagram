import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO Fase 4: implementar PostCard nativo
const PostCard = () => {
  return (
    <View style={styles.card}>
      <Text>PostCard placeholder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default PostCard;
