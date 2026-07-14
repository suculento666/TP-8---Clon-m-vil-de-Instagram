// Stories: carrusel horizontal de historias
// Responsabilidad: recibir un array de posts y mostrarlos como historias
// Usa ScrollView horizontal porque los ítems no son tantos
// (FlatList horizontal sería excesivo para ~12 elementos estáticos)

import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import type { Post } from '../../types'
import StoryItem from './StoryItem'
import { colors, spacing } from '../../theme'

interface StoriesProps {
  posts: Post[]
}

const Stories = ({ posts }: StoriesProps) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.track}
      >
        {posts.map((post) => (
          <StoryItem
            key={post.id}
            username={post.username}
            imageUrl={post.avatarUrl}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    paddingVertical: spacing.sm,
  },
  track: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
})

export default Stories
