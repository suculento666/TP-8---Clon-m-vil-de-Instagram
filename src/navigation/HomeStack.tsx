/**
 * HomeStack.tsx — Stack de navegación de la tab Home
 *
 * Un Stack Navigator apila pantallas como cartas.
 * Cuando navegás a Detail, se apila encima de Feed.
 * Cuando tocás "volver", se desapila y volvés al Feed.
 *
 * Feed: sin header propio (tiene su propio componente Header).
 * Detail: con header nativo de React Navigation que incluye
 *         el botón de volver automáticamente.
 */
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
          // En el detalle sí mostramos el header con la flecha de volver
          headerShown: true,
          title: '',  // sin título, solo la flecha
          headerStyle: { backgroundColor: colors.bgMain },
          headerTintColor: colors.textPrimary,  // flecha en blanco
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
