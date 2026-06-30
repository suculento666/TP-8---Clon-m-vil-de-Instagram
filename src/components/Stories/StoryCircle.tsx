import React from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'

interface StoryCircleProps {
  username: string
  imageUrl: string
}

const StoryCircle = ({ username, imageUrl }: StoryCircleProps) => {
  return (
    <Pressable style={styles.storyCircle}>
      {/* Anillo degradado simulado con borde de color */}
      <View style={styles.ring}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.storyImage}
          accessibilityLabel={username}
        />
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        @{username}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  storyCircle: {
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
    width: 72,
  },
  ring: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 3,
    borderWidth: 2,
    borderColor: '#c13584', // simula el gradiente de Instagram
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
    resizeMode: 'cover',
  },
  storyUsername: {
    fontSize: 11,
    color: '#aaa',
    maxWidth: 68,
    textAlign: 'center',
  },
})

export default StoryCircle
