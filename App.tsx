import React, { useEffect, useCallback, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { View } from 'react-native'
import BottomTabs from './src/navigation/BottomTabs'

// Mantiene la splash visible hasta que llamemos hideAsync().
// Si no se llama esto, la splash se oculta sola antes de que la app esté lista.
SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    // Acá iría cualquier carga inicial (fuentes, assets, etc.)
    // Por ahora solo marcamos que la app está lista
    const prepare = async () => {
      try {
        // Espera mínima para que se vea la splash (opcional, 500ms)
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
    if (appReady) {
      // Oculta la splash cuando el layout raíz ya está montado y visible
      await SplashScreen.hideAsync()
    }
  }, [appReady])

  if (!appReady) return null

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        {/* StatusBar light = texto blanco, contrasta con el fondo negro */}
        <StatusBar style="light" backgroundColor="#000000" />
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  )
}
