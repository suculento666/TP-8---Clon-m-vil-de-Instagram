/**
 * PostDetail.tsx — Vista extendida de un post
 *
 * El like se maneja con useState local para interacción en tiempo real
 * (el corazón y el contador cambian al instante al tocar).
 *
 * initialLiked viene desde DetailScreen con el valor correcto
 * del momento en que se navegó, así el corazón arranca en el
 * estado que corresponde.
 */
import React, { useState } from 'react'
import {
  View, Text, Image, ScrollView, StyleSheet, Dimensions,
} from 'react-native'
import type { Post } from '../../types'
import ActionBar from '../Feed/ActionBar'
import Comment from './Comment'
import { colors, spacing, fontSizes } from '../../theme'

interface PostDetailProps {
  post: Post
  initialLiked: boolean
}

const { width } = Dimensions.get('window')

const PostDetail = ({ post, initialLiked }: PostDetailProps) => {
  const [liked, setLiked] = useState<boolean>(initialLiked)
  // El contador arranca ya sumando +1 si el post venía likeado
  const [likesCount, setLikesCount] = useState<number>(
    initialLiked ? post.likes + 1 : post.likes
  )

  const handleLike = () => {
    setLikesCount((prev) => liked ? prev - 1 : prev + 1)
    setLiked((prev) => !prev)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <Image source={{ uri: post.avatarUrl }} style={styles.avatar}
          accessibilityLabel={`Avatar de ${post.username}`} />
        <View style={styles.headerText}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.location}>{post.location}</Text>
        </View>
      </View>

      <Image source={{ uri: post.imageUrl }}
        style={[styles.image, { height: width }]}
        accessibilityLabel={post.caption} />

      <ActionBar liked={liked} onLike={handleLike} onComment={() => {}} />

      <View style={styles.info}>
        <Text style={styles.likes}>{likesCount.toLocaleString()} me gusta</Text>
        <Text style={styles.caption}>
          <Text style={styles.captionUsername}>{post.username} </Text>
          {post.caption}
        </Text>
        <Text style={styles.date}>{post.date}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.comments}>
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, gap: spacing.sm,
  },
  avatar: { width: 34, height: 34, borderRadius: 17, borderWidth: 1.5, borderColor: colors.storyRing },
  headerText: { flex: 1 },
  username: { fontSize: fontSizes.sm, fontWeight: '700', color: colors.textPrimary },
  location: { fontSize: fontSizes.xs, color: colors.textSecondary },
  image: { width: '100%', resizeMode: 'cover' },
  info: { paddingHorizontal: spacing.lg, paddingTop: spacing.xs, gap: spacing.xs },
  likes: { fontSize: fontSizes.sm, fontWeight: '700', color: colors.textPrimary },
  caption: { fontSize: fontSizes.sm, color: colors.textPrimary, lineHeight: 18 },
  captionUsername: { fontWeight: '700' },
  date: { fontSize: fontSizes.xs, color: colors.textMuted, textTransform: 'uppercase' },
  divider: { height: 0.5, backgroundColor: colors.borderColor, marginTop: spacing.md, marginHorizontal: spacing.lg },
  comments: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: 100 },
})

export default PostDetail
