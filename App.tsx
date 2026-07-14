import React, { useEffect, useCallback, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { View } from 'react-native'
import { AppProvider } from './src/context/AppContext'
import BottomTabs from './src/navigation/BottomTabs'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    const prepare = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppReady(true)
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appReady) await SplashScreen.hideAsync()
  }, [appReady])

  if (!appReady) return null

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="#000000" />
        {/*
          AppProvider envuelve NavigationContainer para que todas
          las pantallas accedan al estado sin pasar props por los navigators.
          Pasar props por navigators causa re-renders que desmontan pantallas.
        */}
        <AppProvider>
          <NavigationContainer>
            <BottomTabs />
          </NavigationContainer>
        </AppProvider>
      </SafeAreaProvider>
    </View>
  )
}
