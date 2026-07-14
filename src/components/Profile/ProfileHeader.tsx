// ProfileHeader: sección superior del perfil (avatar, stats, bio, botón editar)
// Separado de ProfileGrid para que cada uno tenga una responsabilidad clara

import React from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import type { User } from '../../types'
import { colors, spacing, fontSizes } from '../../theme'

interface ProfileHeaderProps {
  user: User
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>

      {/* Fila superior: avatar + métricas */}
      <View style={styles.topRow}>
        <Image
          source={{ uri: user.avatarUrl }}
          style={styles.avatar}
          accessibilityLabel={user.fullName}
        />
        <View style={styles.stats}>
          <Stat label="Publicaciones" value={user.postsCount} />
          <Stat label="Seguidores" value={user.followers} />
          <Stat label="Seguidos" value={user.following} />
        </View>
      </View>

      {/* Nombre y bio */}
      <Text style={styles.fullName}>{user.fullName}</Text>
      <Text style={styles.bio}>{user.bio}</Text>

      {/* Botón editar perfil */}
      <Pressable style={styles.editBtn} accessibilityLabel="Editar perfil">
        <Text style={styles.editBtnText}>Editar perfil</Text>
      </Pressable>

    </View>
  )
}

// Componente interno para cada métrica — evita repetición de estilos
const Stat = ({ label, value }: { label: string; value: number }) => (
  <View style={styles.stat}>
    <Text style={styles.statNumber}>{value.toLocaleString()}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.bgMain,
  },

  // Fila avatar + stats
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    gap: 2,
  },
  statNumber: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: fontSizes.xs,
    color: colors.textPrimary,
  },

  // Texto
  fullName: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  bio: {
    fontSize: fontSizes.sm,
    color: colors.textPrimary,
    lineHeight: 18,
    marginBottom: spacing.md,
  },

  // Botón
  editBtn: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    backgroundColor: colors.bgMain,
  },
  editBtnText: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.textPrimary,
  },
})

export default ProfileHeader
