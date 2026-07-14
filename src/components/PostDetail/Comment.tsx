// Comment: muestra UN comentario dentro del detalle del post
// Componente atómico — solo recibe texto y username por props

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import type { Comment as CommentType } from '../../types'
import { colors, spacing, fontSizes } from '../../theme'

interface CommentProps {
  comment: CommentType
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.username}>{comment.username} </Text>
        {comment.text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs,
  },
  text: {
    fontSize: fontSizes.sm,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  username: {
    fontWeight: '700',
  },
})

export default Comment
