/**
 * ProfileScreen.tsx — Pantalla del perfil del usuario activo
 *
 * Responsabilidades:
 * - Mostrar el perfil de currentUser (datos estáticos, sin login).
 * - Cargar los posts del feed para la grilla (reutiliza useCats).
 * - Navegar a DetailScreen al tocar una foto de la grilla.
 *
 * Usa useNavigation con el tipo de HomeStack para poder navegar
 * a Detail aunque ProfileScreen vive en otro stack (ProfileStack).
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { HomeStackParamList, Post } from '../types'
import { useCats } from '../hooks/useCats'
import { currentUser } from '../data/userData'
import ProfileHeader from '../components/Profile/ProfileHeader'
import ProfileGrid from '../components/Profile/ProfileGrid'
import { colors } from '../theme'

type NavProp = NativeStackNavigationProp<HomeStackParamList>

const ProfileScreen = () => {
  const { posts } = useCats()

  // useNavigation tipado con HomeStack para poder navegar a 'Detail'
  // desde un stack diferente (ProfileStack)
  const navigation = useNavigation<NavProp>()

  const handleSelectPost = (post: Post) => {
    navigation.navigate('Detail', { post })
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/*
        ProfileHeader se pasa como ListHeaderComponent de la FlatList.
        Así el header del perfil scrollea junto con las fotos,
        formando un solo scroll en lugar de tener dos zonas scrolleables.
      */}
      <ProfileGrid
        posts={posts}
        onSelectPost={handleSelectPost}
        ListHeaderComponent={<ProfileHeader user={currentUser} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
})

export default ProfileScreen
