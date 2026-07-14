/**
 * ProfileStack.tsx — Stack de la tab Perfil
 *
 * Por ahora tiene una sola pantalla.
 * Estar en un Stack permite agregar más pantallas en el futuro
 * (como "Editar perfil") sin tocar BottomTabs ni el resto de la navegación.
 */
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createNativeStackNavigator()

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStack
