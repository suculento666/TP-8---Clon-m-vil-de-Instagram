import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import type { Post } from '../../types'
import PostCard from './PostCard'

interface FeedProps {
  posts: Post[]
  // Conjunto de IDs de publicaciones marcadas como "me gusta"
  likedIds: Set<string>
  // Cambia el estado de "me gusta" de una publicación
  onToggleLike: (postId: string) => void
  // Muestra los detalles de la publicación seleccionada
  onSelectPost: (post: Post) => void
  // Componente que se renderiza arriba de la lista (ej: Stories)
  ListHeaderComponent?: React.ReactElement
}

const Feed = ({ posts, likedIds, onToggleLike, onSelectPost, ListHeaderComponent }: FeedProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id}
      contentContainerStyle={styles.feed}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item: post }) => (
        <PostCard
          post={post}
          liked={likedIds.has(post.id)}
          onToggleLike={onToggleLike}
          onSelect={onSelectPost}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  feed: {
    gap: 24,
    paddingBottom: 24,
  },
})

export default Feed
