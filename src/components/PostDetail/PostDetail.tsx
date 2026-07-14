// PostDetail: vista extendida de un post
// Este componente se usa en DetailScreen, que recibe el post por navegación
// El like se maneja con useState local (interacción en tiempo real, como pide la consigna)

import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native'
import type { Post } from '../../types'
import ActionBar from '../Feed/ActionBar'
import Comment from './Comment'
import { colors, spacing, fontSizes } from '../../theme'

interface PostDetailProps {
  post: Post
  // El estado inicial del like viene de FeedScreen (para mantener consistencia)
  initialLiked: boolean
}

const { width } = Dimensions.get('window')

const PostDetail = ({ post, initialLiked }: PostDetailProps) => {
  // useState local para el like — la consigna pide interacción en tiempo real
  const [liked, setLiked] = useState<boolean>(initialLiked)
  const [likesCount, setLikesCount] = useState<number>(post.likes)

  const handleLike = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1)
    } else {
      setLikesCount((prev) => prev + 1)
    }
    setLiked((prev) => !prev)
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header: avatar + username ── */}
      <View style={styles.header}>
        <Image
          source={{ uri: post.avatarUrl }}
          style={styles.avatar}
          accessibilityLabel={`Avatar de ${post.username}`}
        />
        <View style={styles.headerText}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.location}>{post.location}</Text>
        </View>
      </View>

      {/* ── Imagen en alta definición ── */}
      <Image
        source={{ uri: post.imageUrl }}
        style={[styles.image, { height: width }]}
        accessibilityLabel={post.caption}
      />

      {/* ── Barra de acciones — reutiliza ActionBar igual que PostCard ── */}
      <ActionBar
        liked={liked}
        onLike={handleLike}
        onComment={() => {}}
      />

      {/* ── Likes y caption ── */}
      <View style={styles.info}>
        <Text style={styles.likes}>{likesCount.toLocaleString()} me gusta</Text>
        <Text style={styles.caption}>
          <Text style={styles.captionUsername}>{post.username} </Text>
          {post.caption}
        </Text>
        <Text style={styles.date}>{post.date}</Text>
      </View>

      {/* ── Separador ── */}
      <View style={styles.divider} />

      {/* ── Lista de comentarios ── */}
      <View style={styles.comments}>
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: colors.storyRing,
  },
  headerText: {
    flex: 1,
  },
  username: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  location: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
  },

  // Imagen
  image: {
    width: '100%',
    resizeMode: 'cover',
  },

  // Info
  info: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    gap: spacing.xs,
  },
  likes: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  caption: {
    fontSize: fontSizes.sm,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  captionUsername: {
    fontWeight: '700',
  },
  date: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },

  // Comentarios
  divider: {
    height: 0.5,
    backgroundColor: colors.borderColor,
    marginTop: spacing.md,
    marginHorizontal: spacing.lg,
  },
  comments: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: 100,
  },
})

export default PostDetail
