/**
 * DetailScreen.tsx — Pantalla de detalle de un post
 *
 * No llama a ninguna API porque ya tiene todos los datos.
 * El post llega de FeedScreen a través de route.params
 * (parámetros de navegación de React Navigation).
 *
 * El header con el botón de volver lo genera React Navigation
 * automáticamente gracias a la configuración en HomeStack.
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import type { RouteProp } from '@react-navigation/native'
import type { HomeStackParamList } from '../types'
import PostDetail from '../components/PostDetail/PostDetail'
import { colors } from '../theme'

type DetailRouteProp = RouteProp<HomeStackParamList, 'Detail'>

const DetailScreen = () => {
  // useRoute nos da acceso a los parámetros que pasó FeedScreen al navegar
  const route = useRoute<DetailRouteProp>()
  const { post } = route.params

  return (
    // edges={['bottom']}: el header nativo ya cubre el espacio superior,
    // solo necesitamos proteger la parte inferior (home indicator en iPhone).
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <PostDetail post={post} initialLiked={false} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
})

export default DetailScreen
