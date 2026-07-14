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

  // Set de IDs likeados. Set garantiza unicidad sin duplicados.
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  const handleToggleLike = (postId: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev)
      next.has(postId) ? next.delete(postId) : next.add(postId)
      return next
    })
  }

  const handleSelectPost = (post: Post) => {
    navigation.navigate('Detail', { post })
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Cargando gatos...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    // edges={['top']} protege solo el notch superior;
    // el tab bar ya maneja el espacio inferior
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <Feed
        posts={posts}
        likedIds={likedIds}
        onToggleLike={handleToggleLike}
        onSelectPost={handleSelectPost}
        // Stories scrollea junto con los posts gracias a ListHeaderComponent
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
