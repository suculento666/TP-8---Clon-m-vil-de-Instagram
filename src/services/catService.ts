// catService: responsabilidad única — hablar con The Cat API
// No sabe nada de React, no usa hooks, no maneja estado
// Si la API cambia, solo se toca este archivo

import axios from 'axios'
import type { CatImage, Post } from '../types'
import {
  FAKE_USERNAMES,
  FAKE_LOCATIONS,
  FAKE_CAPTIONS,
  FAKE_COMMENTS,
  formatRelativeDate,
} from '../utils/fakeData'

const BASE_URL = 'https://api.thecatapi.com/v1/images/search'

// Trae N imágenes de gatos de la API
const fetchCatImages = async (limit: number): Promise<CatImage[]> => {
  const response = await axios.get<CatImage[]>(BASE_URL, {
    params: { limit, mime_types: 'jpg,png' },
  })
  return response.data
}

// Convierte los datos crudos de la API en Posts con información simulada
export const fetchPosts = async (): Promise<Post[]> => {
  // Dos llamadas en paralelo: imágenes principales y avatares
  // Promise.all garantiza que ambas terminen antes de continuar
  const [images, avatars] = await Promise.all([
    fetchCatImages(12),
    fetchCatImages(12),
  ])

  return images.map((cat, index) => ({
    id: cat.id,
    imageUrl: cat.url,
    // Si hay menos avatares que posts, rotamos con módulo
    avatarUrl: avatars[index % avatars.length].url,
    username: FAKE_USERNAMES[index % FAKE_USERNAMES.length],
    location: FAKE_LOCATIONS[index % FAKE_LOCATIONS.length],
    caption: FAKE_CAPTIONS[index % FAKE_CAPTIONS.length],
    likes: Math.floor(Math.random() * 900) + 50,
    date: formatRelativeDate(Math.floor(Math.random() * 7)),
    comments: FAKE_COMMENTS,
  }))
}
