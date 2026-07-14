/**
 * FeedScreen.tsx — Pantalla principal del feed
 *
 * Responsabilidades:
 * - Obtener los posts de la API via useCats.
 * - Manejar el estado de likes (qué posts están likeados).
 * - Navegar a DetailScreen cuando el usuario toca un post.
 *
 * No dibuja nada directamente — delega en Header, Stories y Feed.
 */
import React, { useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { HomeStackParamList, Post } from '../types'
import { useCats } from '../hooks/useCats'
import Header from '../components/Header'
import Stories from '../components/Stories/Stories'
import Feed from '../components/Feed/Feed'
import { colors } from '../theme'

type NavProp = NativeStackNavigationProp<HomeStackParamList, 'Feed'>

const FeedScreen = () => {
  const navigation = useNavigation<NavProp>()
  const { posts, loading, error } = useCats()

  /**
   * likedIds: Set de IDs de posts likeados por el usuario.
   * Usamos Set (y no array) porque garantiza que cada ID aparezca
   * una sola vez, sin necesidad de chequear duplicados manualmente.
   */
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  /**
   * handleToggleLike: agrega o quita el ID del post del Set de likeados.
   * Creamos un Set nuevo en lugar de mutar el anterior para que React
   * detecte el cambio y vuelva a renderizar el componente.
   */
  const handleToggleLike = (postId: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev)
      next.has(postId) ? next.delete(postId) : next.add(postId)
      return next
    })
  }

  /**
   * handleSelectPost: navega a DetailScreen pasando el post completo.
   * DetailScreen no necesita volver a pedir el post a la API
   * porque ya lo recibe acá por parámetros de navegación.
   */
  const handleSelectPost = (post: Post) => {
    navigation.navigate('Detail', { post })
  }

  // Mientras cargan los datos mostramos un spinner centrado
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Cargando gatos...</Text>
      </View>
    )
  }

  // Si la API falló mostramos el mensaje de error
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    // edges={['top']}: SafeAreaView solo protege el notch superior.
    // El espacio inferior lo maneja el tab bar de React Navigation.
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <Feed
        posts={posts}
        likedIds={likedIds}
        onToggleLike={handleToggleLike}
        onSelectPost={handleSelectPost}
        // Stories se pasa como header de la FlatList para que scrollee
        // junto con los posts, en lugar de quedar fija arriba.
        ListHeaderComponent={<Stories posts={posts} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  centered: {
    flex: 1,
    backgroundColor: colors.bgMain,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  errorText: {
    color: colors.accentLight,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
})

export default FeedScreen
