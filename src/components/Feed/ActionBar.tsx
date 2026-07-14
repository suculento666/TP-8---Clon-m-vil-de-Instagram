// ActionBar: barra de acciones de un post (like, comentar, compartir, guardar)
// Componente separado de PostCard para poder reutilizarlo en DetailScreen
// Recibe el estado del like y emite eventos hacia arriba — no maneja estado propio

import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing } from '../../theme'

interface ActionBarProps {
  liked: boolean
  onLike: () => void
  onComment: () => void
}

const ActionBar = ({ liked, onLike, onComment }: ActionBarProps) => {
  return (
    <View style={styles.container}>
      {/* Acciones izquierda: like, comentar, compartir */}
      <View style={styles.left}>
        <Pressable onPress={onLike} accessibilityLabel={liked ? 'Quitar me gusta' : 'Me gusta'}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={26}
            // El corazón cambia de color según el estado
            color={liked ? colors.liked : colors.textPrimary}
          />
        </Pressable>

        <Pressable onPress={onComment} accessibilityLabel="Comentar" style={styles.btn}>
          <Ionicons name="chatbubble-outline" size={24} color={colors.textPrimary} />
        </Pressable>

        <Pressable accessibilityLabel="Compartir" style={styles.btn}>
          <Ionicons name="paper-plane-outline" size={24} color={colors.textPrimary} />
        </Pressable>
      </View>

      {/* Guardar: siempre a la derecha */}
      <Pressable accessibilityLabel="Guardar">
        <Ionicons name="bookmark-outline" size={24} color={colors.textPrimary} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  btn: {
    marginLeft: spacing.xs,
  },
})

export default ActionBar
