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
  const route = useRoute<DetailRouteProp>()
  const { post, liked } = route.params

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <PostDetail post={post} initialLiked={liked} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
})

export default DetailScreen
