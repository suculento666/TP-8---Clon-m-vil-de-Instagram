// PostCard: representa UNA publicación del feed
// Responsabilidad: mostrar todos los datos de un post y emitir eventos
// No maneja estado propio — el like lo gestiona FeedScreen y llega por props
// Usa ActionBar para la barra de acciones (separación de responsabilidades)

import React from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native'
import type { Post } from '../../types'
import ActionBar from './ActionBar'
import { colors, spacing, fontSizes } from '../../theme'

interface PostCardProps {
  post: Post
  liked: boolean
  onToggleLike: (postId: string) => void
  // onSelect navega a DetailScreen — la decisión de qué hacer la toma la pantalla
  onSelect: (post: Post) => void
}

const { width } = Dimensions.get('window')

const PostCard = ({ post, liked, onToggleLike, onSelect }: PostCardProps) => {
  const likesCount = liked ? post.likes + 1 : post.likes

  return (
    <View style={styles.card}>

      {/* ── Header: avatar + username + ubicación ── */}
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
        <Pressable accessibilityLabel="Más opciones" style={styles.moreBtn}>
          <Text style={styles.moreDots}>•••</Text>
        </Pressable>
      </View>

      {/* ── Imagen del post (doble tap para likear, tap para ver detalle) ── */}
      <Pressable onPress={() => onSelect(post)}>
        <Image
          source={{ uri: post.imageUrl }}
          // La imagen es cuadrada — ancho completo de pantalla
          style={[styles.image, { height: width }]}
          accessibilityLabel={post.caption}
        />
      </Pressable>

      {/* ── Barra de acciones ── */}
      <ActionBar
        liked={liked}
        onLike={() => onToggleLike(post.id)}
        onComment={() => onSelect(post)}
      />

      {/* ── Info: likes, caption, ver comentarios, fecha ── */}
      <View style={styles.info}>
        <Text style={styles.likes}>{likesCount.toLocaleString()} me gusta</Text>

        <Text style={styles.caption} numberOfLines={2}>
          <Text style={styles.captionUsername}>{post.username} </Text>
          {post.caption}
        </Text>

        <Pressable onPress={() => onSelect(post)}>
          <Text style={styles.viewComments}>
            Ver los {post.comments.length} comentarios
          </Text>
        </Pressable>

        <Text style={styles.date}>{post.date}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    marginBottom: spacing.xs,
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
  moreBtn: {
    padding: spacing.xs,
  },
  moreDots: {
    color: colors.textPrimary,
    fontSize: fontSizes.md,
    letterSpacing: 1,
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
    paddingBottom: spacing.lg,
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
  viewComments: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
  date: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
})

export default PostCard
