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
 * Hace dos pedidos en paralelo con Promise.all:
 * - uno para las imágenes principales del feed
 * - uno para los avatares
 * Promise.all espera a que AMBOS terminen antes de continuar.
 * Es más rápido que hacerlos uno después del otro (await secuencial).
 *
 * Después combina las imágenes con datos inventados de fakeData
 * para simular publicaciones reales.
 */
export const fetchPosts = async (): Promise<Post[]> => {
  const [images, avatars] = await Promise.all([
    fetchCatImages(12),
    fetchCatImages(12),
  ])

  return images.map((cat, index) => ({
    id: cat.id,
    imageUrl: cat.url,
    // Si hay menos avatares que posts, el módulo (%) hace que roten
    // volviendo al principio cuando se acaban
    avatarUrl: avatars[index % avatars.length].url,
    username: FAKE_USERNAMES[index % FAKE_USERNAMES.length],
    location: FAKE_LOCATIONS[index % FAKE_LOCATIONS.length],
    caption: FAKE_CAPTIONS[index % FAKE_CAPTIONS.length],
    likes: Math.floor(Math.random() * 900) + 50,
    date: formatRelativeDate(Math.floor(Math.random() * 7)),
    comments: FAKE_COMMENTS,
  }))
}
