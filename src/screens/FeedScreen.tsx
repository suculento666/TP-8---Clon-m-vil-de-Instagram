import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { HomeStackParamList, Post } from '../types'
import { useAppContext } from '../context/AppContext'
import Header from '../components/Header'
import Stories from '../components/Stories/Stories'
import Feed from '../components/Feed/Feed'
import { colors } from '../theme'

type NavProp = NativeStackNavigationProp<HomeStackParamList, 'Feed'>

const FeedScreen = () => {
  const navigation = useNavigation<NavProp>()
  const { posts, loading, error, likedIds, toggleLike } = useAppContext()

  const handleSelectPost = (post: Post) => {
    navigation.navigate('Detail', { post, liked: likedIds.has(post.id) })
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <Feed
        posts={posts}
        likedIds={likedIds}
        onToggleLike={toggleLike}
        onSelectPost={handleSelectPost}
        ListHeaderComponent={<Stories posts={posts} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  centered: {
    flex: 1, backgroundColor: colors.bgMain,
    alignItems: 'center', justifyContent: 'center', gap: 12,
  },
  loadingText: { color: colors.textSecondary, fontSize: 14 },
  errorText: { color: colors.accentLight, fontSize: 14, textAlign: 'center', paddingHorizontal: 24 },
})

export default FeedScreen
