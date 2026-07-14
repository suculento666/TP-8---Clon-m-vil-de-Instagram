import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { HomeStackParamList } from '../types'
import FeedScreen from '../screens/FeedScreen'
import DetailScreen from '../screens/DetailScreen'
import { colors } from '../theme'

const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bgMain },
      }}
    >
      <Stack.Screen name="Feed" component={FeedScreen} />
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

export default HomeStack
