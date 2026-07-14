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
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000', borderTopColor: '#262626' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#737373',
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
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
