/**
 * App.tsx — Punto de entrada de la aplicación
 *
 * Hace tres cosas:
 * 1. Le dice a la splash que no se esconda sola (preventAutoHideAsync).
 * 2. Espera a que la app esté lista y recién entonces la oculta (hideAsync).
 * 3. Monta los providers globales: SafeAreaProvider, StatusBar y NavigationContainer.
 */
import React, { useEffect, useCallback, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { View } from 'react-native'
import BottomTabs from './src/navigation/BottomTabs'

// Evita que la splash desaparezca antes de que la app esté lista.
// Sin esta línea la splash dura apenas un instante y no se ve.
SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    /**
     * prepare: simula la carga inicial de la app (fuentes, assets, etc.)
     * En este proyecto solo espera 500ms para que la splash sea visible.
     * En un proyecto real acá cargarías fuentes con expo-font o datos iniciales.
     */
    const prepare = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
      } catch (e) {
        console.warn(e)
      } finally {
        // finally se ejecuta siempre, tanto si hubo error como si no.
        // Garantiza que appReady pase a true pase lo que pase.
        setAppReady(true)
      }
    }
    prepare()
  }, [])

  /**
   * onLayoutRootView: se ejecuta cuando el View raíz termina de dibujarse.
   * Recién en ese momento ocultamos la splash — así el usuario nunca ve
   * un flash de pantalla en blanco entre la splash y la app.
   */
  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync()
    }
  }, [appReady])

  // Mientras la app no está lista, no renderizamos nada (la splash sigue visible).
  if (!appReady) return null

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        {/* style="light" → texto e íconos de la status bar en blanco,
            contrasta correctamente sobre el fondo negro de la app */}
        <StatusBar style="light" backgroundColor="#000000" />
        {/* NavigationContainer es el contexto global de React Navigation.
            Debe envolver todo el árbol de navegación. */}
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  )
}
