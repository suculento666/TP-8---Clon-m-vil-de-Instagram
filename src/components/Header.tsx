// Header: barra superior de la app
// Responsabilidad única: mostrar el logo y los íconos de acción superiores
// No conoce la API, ni los posts, ni la navegación entre tabs

import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, spacing, fontSizes } from '../theme'

const Header = () => {
  return (
    <View style={styles.container}>
      {/* Logo en cursiva, igual que Instagram */}
      <Text style={styles.logo}>Catsgram</Text>

      {/* Íconos del lado derecho */}
      <View style={styles.icons}>
        <Pressable style={styles.iconBtn} accessibilityLabel="Agregar publicación">
          <Ionicons name="add-circle-outline" size={26} color={colors.textPrimary} />
        </Pressable>
        <Pressable style={styles.iconBtn} accessibilityLabel="Notificaciones">
          <Ionicons name="heart-outline" size={26} color={colors.textPrimary} />
        </Pressable>
        <Pressable style={styles.iconBtn} accessibilityLabel="Mensajes directos">
          <Ionicons name="paper-plane-outline" size={26} color={colors.textPrimary} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.bgPanel,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
  },
  logo: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    fontStyle: 'italic',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconBtn: {
    padding: spacing.xs,
  },
})

export default Header
