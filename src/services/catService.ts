/**
 * catService.ts — Servicio de comunicación con The Cat API
 *
 * Responsabilidad única: saber cómo hablar con la API.
 * No sabe nada de React, no usa hooks, no maneja estado.
 * Si mañana cambiás de API, solo tocás este archivo.
 */
import axios from 'axios'
import type { CatImage, Post } from '../types'
import {
  FAKE_USERNAMES,
  FAKE_LOCATIONS,
  FAKE_CAPTIONS,
  FAKE_COMMENTS,
  formatRelativeDate,
} from '../utils/fakeData'
import { currentUser } from '../data/userData'

const BASE_URL = 'https://api.thecatapi.com/v1/images/search'

/**
 * fetchCatImages: hace un GET a la API y devuelve un array de imágenes.
 * @param limit — cuántas imágenes pedir
 */
const fetchCatImages = async (limit: number): Promise<CatImage[]> => {
  const response = await axios.get<CatImage[]>(BASE_URL, {
    params: { limit, mime_types: 'jpg,png' },
  })
  return response.data
}

/**
 * fetchPosts: trae imágenes de la API y las convierte en objetos Post.
 *
 * Distribuye los posts entre el usuario activo y otros usuarios simulados.
 * Los posts en índices múltiplos de 4 (0, 4, 8) se asignan al currentUser,
 * el resto a los otros usernames. Así el perfil siempre tiene fotos propias.
 */
export const fetchPosts = async (): Promise<Post[]> => {
  // Dos pedidos en paralelo: imágenes del feed y avatares
  const [images, avatars] = await Promise.all([
    fetchCatImages(12),
    fetchCatImages(12),
  ])

  return images.map((cat, index) => {
    // Cada 4 posts uno pertenece al usuario activo (índices 0, 4, 8)
    const isMyPost = index % 4 === 0

    return {
      id: cat.id,
      imageUrl: cat.url,
      // Si es mi post uso mi avatar; si no, uno del pool de avatares
      avatarUrl: isMyPost
        ? currentUser.avatarUrl
        : avatars[index % avatars.length].url,
      // Si es mi post uso mi username; si no, uno del pool de usernames
      username: isMyPost
        ? currentUser.username
        : FAKE_USERNAMES[index % FAKE_USERNAMES.length],
      location: FAKE_LOCATIONS[index % FAKE_LOCATIONS.length],
      caption: FAKE_CAPTIONS[index % FAKE_CAPTIONS.length],
      likes: Math.floor(Math.random() * 900) + 50,
      date: formatRelativeDate(Math.floor(Math.random() * 7)),
      comments: FAKE_COMMENTS,
    }
  })
}
