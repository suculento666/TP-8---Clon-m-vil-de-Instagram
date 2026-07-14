// useCats: responsabilidad única — manejar el estado de los posts
// No sabe cómo se llama a la API, solo llama a catService y guarda el resultado
// Cualquier pantalla que necesite los posts puede usar este hook

import { useState, useEffect } from 'react'
import type { Post } from '../types'
import { fetchPosts } from '../services/catService'

interface UseCatsResult {
  posts: Post[]
  loading: boolean
  error: string | null
}

export const useCats = (): UseCatsResult => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // La función async va adentro del useEffect porque useEffect
    // no puede recibir una función async directamente como callback
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts()
        setPosts(fetchedPosts)
      } catch {
        setError('No se pudieron cargar las imágenes. Revisá tu conexión.')
      } finally {
        // finally garantiza que loading se apaga siempre,
        // tanto si el fetch fue exitoso como si falló
        setLoading(false)
      }
    }

    loadPosts()
  }, []) // [] = solo se ejecuta al montar el componente (una sola vez)

  return { posts, loading, error }
}
