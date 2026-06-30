import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO Fase 4: implementar StoryCircle nativo
const StoryCircle = () => {
  return (
    <View style={styles.circle}>
      <Text style={styles.text}>👤</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  text: {
    fontSize: 24,
  },
});

export default StoryCircle;
