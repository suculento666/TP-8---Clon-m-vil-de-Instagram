import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import type { Post } from '../../types'
import StoryCircle from './StoryCircle'

interface StoriesProps {
  posts: Post[]
}

const Stories = ({ posts }: StoriesProps) => {
  return (
    <View style={styles.stories}>
      {/* ScrollView horizontal reemplaza el div con overflow-x: auto */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesTrack}
      >
        {posts.map((post) => (
          <StoryCircle
            key={post.id}
            username={post.username}
            imageUrl={post.imageUrl}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  stories: {
    width: '100%',
    marginBottom: 24,
  },
  storiesTrack: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
})

export default Stories
