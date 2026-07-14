// StoryItem: muestra UNA historia en el carrusel superior
// Recibe los datos por props, no sabe de dónde vienen
// El anillo de color simula las historias no vistas de Instagram

import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { colors, spacing, fontSizes } from '../../theme'

interface StoryItemProps {
  username: string
  imageUrl: string
}

const StoryItem = ({ username, imageUrl }: StoryItemProps) => {
  return (
    <View style={styles.container}>
      {/* Anillo degradado simulado con borde de color */}
      <View style={styles.ring}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.avatar}
          accessibilityLabel={`Historia de ${username}`}
        />
      </View>
      {/* Nombre truncado para que no desborde */}
      <Text style={styles.username} numberOfLines={1}>
        {username}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 70,
    gap: spacing.xs,
  },
  // El "ring" es un View con borde de color que rodea la imagen
  ring: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: colors.storyRing,
    padding: 2,
    backgroundColor: colors.bgMain,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  username: {
    fontSize: fontSizes.xs,
    color: colors.textPrimary,
    textAlign: 'center',
    maxWidth: 64,
  },
})

export default StoryItem
