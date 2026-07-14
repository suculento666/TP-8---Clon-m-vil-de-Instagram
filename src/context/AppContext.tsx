/**
 * AppContext.tsx — Contexto global de la aplicación
 *
 * Resuelve un problema concreto y demostrado:
 * pasar posts y likedIds por props a través de los navigators
 * causa que los navigators re-rendericen y desmonten las pantallas
 * cada vez que cambia el estado (confirmado con console.log).
 *
 * Context evita ese problema: las pantallas leen el estado
 * directamente sin que los navigators intermedios se enteren.
 */
import React, { createContext, useContext, useState } from 'react'
import type { Post } from '../types'
import { useCats } from '../hooks/useCats'

interface AppContextType {
  posts: Post[]
  loading: boolean
  error: string | null
  likedIds: Set<string>
  toggleLike: (postId: string) => void
}

const AppContext = createContext<AppContextType>({
  posts: [],
  loading: true,
  error: null,
  likedIds: new Set(),
  toggleLike: () => {},
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // Un solo fetch para toda la app — IDs estables durante la sesión
  const { posts, loading, error } = useCats()

  // Un solo Set de likes — compartido por Feed, Detail y Profile
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  const toggleLike = (postId: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev)
      next.has(postId) ? next.delete(postId) : next.add(postId)
      return next
    })
  }

  return (
    <AppContext.Provider value={{ posts, loading, error, likedIds, toggleLike }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook para consumir el contexto — una línea en cada pantalla
export const useAppContext = () => useContext(AppContext)
