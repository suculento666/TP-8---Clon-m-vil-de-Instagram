// ProfileGrid: cuadrícula de 3 columnas con las fotos del perfil
// Usa FlatList con numColumns={3} — requisito explícito de la consigna
// Separado de ProfileHeader para que ProfileScreen pueda usarlos de forma independiente

import React from 'react'
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native'
import type { Post } from '../../types'
import { colors } from '../../theme'

interface ProfileGridProps {
  posts: Post[]
  onSelectPost: (post: Post) => void
  // El header (ProfileHeader) se pasa desde ProfileScreen para que scrollee junto con la grilla
  ListHeaderComponent?: React.ReactElement
}

const { width } = Dimensions.get('window')
// 3 columnas con 1px de separación entre ellas
const ITEM_SIZE = (width - 2) / 3

const ProfileGrid = ({ posts, onSelectPost, ListHeaderComponent }: ProfileGridProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id}
      numColumns={3}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item: post }) => (
        <Pressable
          style={styles.item}
          onPress={() => onSelectPost(post)}
          accessibilityLabel={post.caption}
        >
          <Image
            source={{ uri: post.imageUrl }}
            style={styles.image}
            accessibilityLabel={post.caption}
          />
        </Pressable>
      )}
      ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.grid}
    />
  )
}

const styles = StyleSheet.create({
  grid: {
    backgroundColor: colors.bgMain,
    paddingBottom: 80,
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: 0.5,
    backgroundColor: colors.bgCard,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  rowSeparator: {
    height: 1,
    backgroundColor: colors.bgMain,
  },
})

export default ProfileGrid
