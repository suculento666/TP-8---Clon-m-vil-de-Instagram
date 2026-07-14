import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { ProfileStackParamList } from '../types'
import ProfileScreen from '../screens/ProfileScreen'
import DetailScreen from '../screens/DetailScreen'
import { colors } from '../theme'

const Stack = createNativeStackNavigator<ProfileStackParamList>()

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerShown: true,
          title: '',
          headerStyle: { backgroundColor: colors.bgMain },
          headerTintColor: colors.textPrimary,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default ProfileStack
