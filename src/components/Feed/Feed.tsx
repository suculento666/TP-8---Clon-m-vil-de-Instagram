// Feed: renderiza la lista de posts con FlatList
// Responsabilidad única: mostrar los posts de forma eficiente
// FlatList es obligatorio por la consigna — renderiza solo los ítems visibles
// (a diferencia de map() que renderiza todos a la vez)

import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import type { Post } from '../../types'
import PostCard from './PostCard'
import { colors } from '../../theme'

interface FeedProps {
  posts: Post[]
  likedIds: Set<string>
  onToggleLike: (postId: string) => void
  onSelectPost: (post: Post) => void
  // ListHeaderComponent permite insertar Stories arriba del feed
  // y que scrolleen junto con los posts (mejor UX que un ScrollView externo)
  ListHeaderComponent?: React.ReactElement
}

const Feed = ({
  posts,
  likedIds,
  onToggleLike,
  onSelectPost,
  ListHeaderComponent,
}: FeedProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id}
      renderItem={({ item: post }) => (
        <PostCard
          post={post}
          liked={likedIds.has(post.id)}
          onToggleLike={onToggleLike}
          onSelect={onSelectPost}
        />
      )}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.bgMain,
    paddingBottom: 80, // espacio para que el último post no quede detrás del tab bar
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.borderColor,
  },
})

export default Feed
