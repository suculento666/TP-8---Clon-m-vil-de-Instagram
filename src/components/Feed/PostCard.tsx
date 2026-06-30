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

interface PostCardProps {
  post: Post
  liked: boolean
  onToggleLike: (postId: string) => void
  onSelect: (post: Post) => void
}

const { width } = Dimensions.get('window')

const PostCard = ({ post, liked, onToggleLike, onSelect }: PostCardProps) => {
  // Si el post ya está likeado, se muestra likes + 1
  const likesCount = liked ? post.likes + 1 : post.likes

  return (
    <View style={styles.card}>

      {/* Header: avatar + username + opciones */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: post.avatarUrl }}
            style={styles.avatar}
            accessibilityLabel={post.username}
          />
          <Text style={styles.username}>{post.username}</Text>
        </View>
        <Pressable accessibilityLabel="Opciones">
          <Text style={styles.optionsBtn}>···</Text>
        </Pressable>
      </View>

      {/* Imagen del post */}
      <Pressable onPress={() => onSelect(post)}>
        <Image
          source={{ uri: post.imageUrl }}
          style={styles.image}
          accessibilityLabel={post.caption}
        />
      </Pressable>

      {/* Botones de acción */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <Pressable
            onPress={() => onToggleLike(post.id)}
            accessibilityLabel="Me gusta"
          >
            <Text style={styles.actionBtn}>{liked ? '❤️' : '🤍'}</Text>
          </Pressable>
          <Pressable onPress={() => onSelect(post)} accessibilityLabel="Comentarios">
            <Text style={styles.actionBtn}>💬</Text>
          </Pressable>
          <Pressable accessibilityLabel="Compartir">
            <Text style={styles.actionBtn}>📤</Text>
          </Pressable>
        </View>
        <Pressable accessibilityLabel="Guardar">
          <Text style={styles.actionBtn}>🔖</Text>
        </Pressable>
      </View>

      {/* Info: likes, caption, comentarios, fecha */}
      <View style={styles.info}>
        <Text style={styles.likes}>{likesCount} me gusta</Text>
        <Text style={styles.caption}>
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
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    overflow: 'hidden',
    width: '100%',
  },

  // Header
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#833ab4',
  },
  username: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  optionsBtn: {
    color: '#aaa',
    fontSize: 20,
    paddingHorizontal: 4,
  },

  // Imagen cuadrada
  image: {
    width: '100%',
    height: width, // cuadrado proporcional al ancho de pantalla
    resizeMode: 'cover',
  },

  // Acciones
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  leftActions: {
    flexDirection: 'row',
    gap: 14,
  },
  actionBtn: {
    fontSize: 22,
  },

  // Info
  info: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 14,
    gap: 4,
  },
  likes: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  caption: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  captionUsername: {
    fontWeight: '700',
  },
  viewComments: {
    fontSize: 13,
    color: '#aaa',
  },
  date: {
    fontSize: 11,
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
})

export default PostCard
