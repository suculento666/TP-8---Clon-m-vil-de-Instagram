import React from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native'
import type { User, Post } from '../../types'

interface ProfileProps {
  user: User
  posts: Post[]
  onSelectPost: (post: Post) => void
}

const { width } = Dimensions.get('window')
const ITEM_SIZE = (width - 2) / 3 // 3 columnas con 1px de gap entre ellas

const Profile = ({ user, posts, onSelectPost }: ProfileProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id}
      numColumns={3}
      ListHeaderComponent={
        <>
          {/* Header: avatar + stats */}
          <View style={styles.header}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
              accessibilityLabel={user.fullName}
            />
            <View style={styles.info}>
              <View style={styles.topRow}>
                <Text style={styles.username}>{user.username}</Text>
                <Pressable style={styles.editBtn}>
                  <Text style={styles.editBtnText}>Editar perfil</Text>
                </Pressable>
              </View>
              <View style={styles.stats}>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{user.posts}</Text>
                  <Text style={styles.statLabel}>publicaciones</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{user.followers}</Text>
                  <Text style={styles.statLabel}>seguidores</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{user.following}</Text>
                  <Text style={styles.statLabel}>seguidos</Text>
                </View>
              </View>
              <View style={styles.bio}>
                <Text style={styles.fullName}>{user.fullName}</Text>
                <Text style={styles.bioText}>{user.bio}</Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Tab */}
          <View style={styles.tabs}>
            <Text style={styles.tabActive}>PUBLICACIONES</Text>
          </View>
        </>
      }
      renderItem={({ item: post }) => (
        // Cada celda del grid es cuadrada
        <Pressable
          style={styles.gridItem}
          onPress={() => onSelectPost(post)}
          accessibilityLabel={post.caption}
        >
          <Image
            source={{ uri: post.imageUrl }}
            style={styles.gridImage}
            accessibilityLabel={post.caption}
          />
        </Pressable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24,
    padding: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#c13584',
  },
  info: {
    flex: 1,
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: '400',
    color: '#fff',
  },
  editBtn: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2a2a3e',
    backgroundColor: '#1a1a2e',
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },

  // Stats
  stats: {
    flexDirection: 'row',
    gap: 20,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  statNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 13,
    color: '#fff',
  },

  // Bio
  bio: {
    gap: 2,
  },
  fullName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  bioText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },

  // Divider
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },

  // Tabs
  tabs: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabActive: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
    borderTopWidth: 2,
    borderTopColor: '#fff',
    paddingTop: 8,
  },

  // Grid
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: 0.5,
    backgroundColor: '#1a1a2e',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})

export default Profile
