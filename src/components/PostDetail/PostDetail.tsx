import React from 'react'
import {
  Modal,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native'
import type { Post } from '../../types'

interface PostDetailProps {
  post: Post | null
  liked: boolean
  onToggleLike: (postId: string) => void
  onClose: () => void
}

const { width } = Dimensions.get('window')

const PostDetail = ({ post, liked, onToggleLike, onClose }: PostDetailProps) => {
  // Si no hay post seleccionado no se muestra nada, igual que en el web
  if (!post) return null

  const likesCount = liked ? post.likes + 1 : post.likes

  return (
    // Modal reemplaza al overlay fixed del web
    <Modal
      visible={!!post}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay: toque fuera cierra el modal */}
      <Pressable style={styles.overlay} onPress={onClose}>

        {/* Contenedor del modal: stopPropagation equivalente */}
        <Pressable style={styles.modal} onPress={() => {}}>

          {/* Botón cerrar */}
          <Pressable style={styles.closeBtn} onPress={onClose} accessibilityLabel="Cerrar">
            <Text style={styles.closeBtnText}>✕</Text>
          </Pressable>

          {/* Imagen */}
          <Image
            source={{ uri: post.imageUrl }}
            style={styles.image}
            accessibilityLabel={post.caption}
          />

          {/* Sección de info */}
          <View style={styles.infoSection}>

            {/* Header: avatar + username */}
            <View style={styles.header}>
              <Image
                source={{ uri: post.avatarUrl }}
                style={styles.avatar}
                accessibilityLabel={post.username}
              />
              <Text style={styles.username}>{post.username}</Text>
            </View>

            {/* Comentarios scrolleables */}
            <ScrollView style={styles.comments} contentContainerStyle={styles.commentsContent}>
              {/* Caption */}
              <Text style={styles.caption}>
                <Text style={styles.bold}>{post.username} </Text>
                {post.caption}
              </Text>
              {/* Lista de comentarios */}
              {post.comments.map((comment) => (
                <Text key={comment.id} style={styles.comment}>
                  <Text style={styles.bold}>{comment.username} </Text>
                  {comment.text}
                </Text>
              ))}
            </ScrollView>

            {/* Acciones */}
            <View style={styles.actions}>
              <View style={styles.actionRow}>
                <Pressable onPress={() => onToggleLike(post.id)} accessibilityLabel="Me gusta">
                  <Text style={styles.actionBtn}>{liked ? '❤️' : '🤍'}</Text>
                </Pressable>
                <Pressable accessibilityLabel="Comentar">
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

            {/* Footer: likes + fecha */}
            <View style={styles.footer}>
              <Text style={styles.likes}>{likesCount} me gusta</Text>
              <Text style={styles.date}>{post.date}</Text>
            </View>

          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  // Overlay semitransparente
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Contenedor del modal
  modal: {
    width: width * 0.92,
    maxHeight: '90%',
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    overflow: 'hidden',
  },

  // Botón cerrar flotante
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2a2a3e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 16,
  },

  // Imagen cuadrada
  image: {
    width: '100%',
    height: width * 0.92, // cuadrado proporcional al ancho del modal
    resizeMode: 'cover',
  },

  // Info section debajo de la imagen (en mobile va abajo, no al lado)
  infoSection: {
    flexDirection: 'column',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#c13584',
  },
  username: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },

  // Comentarios
  comments: {
    maxHeight: 160,
  },
  commentsContent: {
    padding: 16,
    gap: 12,
  },
  caption: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  comment: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  bold: {
    fontWeight: '700',
  },

  // Acciones
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 14,
  },
  actionBtn: {
    fontSize: 22,
  },

  // Footer
  footer: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 16,
    gap: 4,
  },
  likes: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  date: {
    fontSize: 11,
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
})

export default PostDetail
