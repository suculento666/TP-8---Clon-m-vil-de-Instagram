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

// ProfileScreen navega a Detail que vive en HomeStack.
// useNavigation con el tipo de HomeStack le permite cruzar al otro stack.
type NavProp = NativeStackNavigationProp<HomeStackParamList>

const ProfileScreen = () => {
  const { posts } = useCats()
  const navigation = useNavigation<NavProp>()

  const handleSelectPost = (post: Post) => {
    navigation.navigate('Detail', { post })
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/*
        ProfileHeader se pasa como ListHeaderComponent para que
        scrollee junto con el grid — así el perfil completo es un solo scroll.
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
