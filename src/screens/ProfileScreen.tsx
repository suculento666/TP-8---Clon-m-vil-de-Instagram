import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ProfileStackParamList, Post } from '../types'
import { useAppContext } from '../context/AppContext'
import { currentUser } from '../data/userData'
import ProfileHeader from '../components/Profile/ProfileHeader'
import ProfileGrid from '../components/Profile/ProfileGrid'
import { colors } from '../theme'

type NavProp = NativeStackNavigationProp<ProfileStackParamList>

const ProfileScreen = () => {
  const { posts, likedIds } = useAppContext()
  const navigation = useNavigation<NavProp>()

  const myPosts = posts.filter((p) => p.username === currentUser.username)

  const handleSelectPost = (post: Post) => {
    navigation.navigate('Detail', { post, liked: likedIds.has(post.id) })
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ProfileGrid
        posts={myPosts}
        onSelectPost={handleSelectPost}
        ListHeaderComponent={<ProfileHeader user={currentUser} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
})

export default ProfileScreen
