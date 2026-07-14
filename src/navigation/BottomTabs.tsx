/**
 * BottomTabs.tsx — Barra de navegación inferior
 *
 * Tiene dos tabs: Home (casita) y Perfil (persona).
 * Cada tab carga un Stack completo, por eso cada tab tiene
 * su propio historial de navegación independiente del otro.
 *
 * Los íconos cambian entre relleno y contorno según cuál tab está activa.
 */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import HomeStack from './HomeStack'
import ProfileStack from './ProfileStack'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Cada Stack maneja su propio header, no necesitamos uno acá
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000', borderTopColor: '#262626' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#737373',
        // Instagram no muestra texto debajo de los íconos
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          // El ícono cambia según el nombre de la tab y si está activa (focused)
          const iconName: React.ComponentProps<typeof Ionicons>['name'] =
            route.name === 'HomeTab'
              ? focused ? 'home' : 'home-outline'
              : focused ? 'person' : 'person-outline'
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  )
}

export default BottomTabs
