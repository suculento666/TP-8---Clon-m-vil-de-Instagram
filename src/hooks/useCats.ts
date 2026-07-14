/**
 * useCats.ts — Hook personalizado para obtener los posts
 *
 * Responsabilidad única: manejar el ciclo de vida del fetch.
 * No sabe cómo se llama a la API — eso lo hace catService.
 * No renderiza nada — eso lo hacen los componentes.
 *
 * Devuelve tres valores que cualquier pantalla puede usar:
 * - posts: el array de publicaciones listo para mostrar
 * - loading: true mientras espera la respuesta de la API
 * - error: mensaje de error si el fetch falló, null si anduvo bien
 */
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
    /**
     * loadPosts: función async dentro del useEffect.
     * useEffect no puede recibir una función async directamente
     * como callback (devolvería una Promise en lugar de una función
     * de limpieza), por eso la definimos adentro y la llamamos.
     */
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts()
        setPosts(fetchedPosts)
      } catch {
        setError('No se pudieron cargar las imágenes. Revisá tu conexión.')
      } finally {
        // finally se ejecuta siempre, tanto si el fetch fue exitoso
        // como si falló. Garantiza que loading se apague en ambos casos.
        setLoading(false)
      }
    }

    loadPosts()
  }, [])
  // El array vacío [] significa que este efecto se ejecuta
  // una sola vez cuando el componente se monta, nunca más.

  return { posts, loading, error }
}
