import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import type { Post } from './src/types'
import { useCats } from './src/hooks/useCats'
import { currentUser } from './src/data/userData'
import { colors } from './src/theme'

import Navbar from './src/components/NavBar/Navbar'
import Stories from './src/components/Stories/Stories'
import Feed from './src/components/Feed/Feed'
import Profile from './src/components/Profile/Profile'
import PostDetail from './src/components/PostDetail/PostDetail'

export default function App() {
  const { posts, loading, error } = useCats()

  // Post seleccionado para el modal de detalle (null = cerrado)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  // Vista activa — misma lógica que el web, sin React Navigation
  const [activeView, setActiveView] = useState<'feed' | 'profile'>('feed')

  // Set de IDs likeados — Set garantiza valores únicos sin duplicados
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  const handleToggleLike = (postId: string) => {
    setLikedIds((prev) => {
      if (prev.has(postId)) {
        // Ya estaba likeado: lo eliminamos con filter
        return new Set(Array.from(prev).filter((id) => id !== postId))
      }
      // No estaba: lo agregamos
      return new Set([...prev, postId])
    })
  }

  return (
    <SafeAreaProvider style={styles.provider}>
      <SafeAreaView style={styles.app} edges={['top', 'bottom']}>

        {/* Header superior */}
        <Navbar onNavigate={setActiveView} />

        {/* Contenido principal */}
        {loading && (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.gradientMid2} />
            <Text style={styles.loadingMsg}>Cargando gatos...</Text>
          </View>
        )}

        {error && (
          <View style={styles.centered}>
            <Text style={styles.errorMsg}>{error}</Text>
          </View>
        )}

        {!loading && !error && activeView === 'feed' && (
          // Stories va como ListHeaderComponent para que scrollee junto con el feed
          <Feed
            posts={posts}
            likedIds={likedIds}
            onToggleLike={handleToggleLike}
            onSelectPost={setSelectedPost}
            ListHeaderComponent={<Stories posts={posts} />}
          />
        )}

        {!loading && !error && activeView === 'profile' && (
          <Profile
            user={currentUser}
            posts={posts}
            onSelectPost={setSelectedPost}
          />
        )}

        {/* Modal de detalle */}
        <PostDetail
          post={selectedPost}
          liked={selectedPost ? likedIds.has(selectedPost.id) : false}
          onToggleLike={handleToggleLike}
          onClose={() => setSelectedPost(null)}
        />

        {/* Tab bar inferior — equivalente al Sidebar del web */}
        <View style={styles.tabBar}>
          <Pressable
            style={[styles.tabItem, activeView === 'feed' && styles.tabItemActive]}
            onPress={() => setActiveView('feed')}
            accessibilityLabel="Inicio"
          >
            <Text style={[styles.tabLabel, activeView === 'feed' && styles.tabLabelActive]}>
              🏠 Inicio
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tabItem, activeView === 'profile' && styles.tabItemActive]}
            onPress={() => setActiveView('profile')}
            accessibilityLabel="Perfil"
          >
            <Text style={[styles.tabLabel, activeView === 'profile' && styles.tabLabelActive]}>
              👤 Perfil
            </Text>
          </Pressable>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  provider: {
    flex: 1,
  },
  app: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingMsg: {
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: 8,
  },
  errorMsg: {
    color: '#fd1d1d',
    fontSize: 15,
  },
  // Tab bar — equivalente al Sidebar lateral del web
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    backgroundColor: colors.bgPanel,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabItemActive: {
    borderTopWidth: 2,
    borderTopColor: colors.gradientMid2,
  },
  tabLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: colors.textPrimary,
  },
})
