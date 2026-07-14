// Datos simulados para poblar los posts con información realista
// Se separan aquí para mantener catService limpio y reutilizable

import type { Comment } from '../types'

export const FAKE_USERNAMES = [
  'gregory_cats',
  'einstein___',
  'felino_chad',
  'gribsman',
  'bataaaa',
  'el_syrupppp',
  'cabo_gustavo',
  'cala_mortiz',
  'suculento666',
  'michifuerte',
  'lobo_felino',
  'noche_gatuna',
]

export const FAKE_LOCATIONS = [
  'Buenos Aires, Argentina',
  'Córdoba, Argentina',
  'Rosario, Argentina',
  'Mendoza, Argentina',
  'La Plata, Argentina',
  'Mar del Plata, Argentina',
  'Salta, Argentina',
  'San Juan, Argentina',
]

export const FAKE_CAPTIONS = [
  'Lunes de siesta 😴',
  'El jefe de la casa 🐾',
  'No me molestes 😤',
  'Solo vine a dormir aquí',
  'Mirando el mundo pasar 🌍',
  'Este soy yo a las 8am',
  'Supervisando el trabajo desde casa 💻',
  'El arte de no hacer nada 🎨',
  'Cargando... 🔋',
  'Mi cara los lunes 😒',
  'Día de sol ☀️',
  'Filosofía gatuna 🧘',
]

// Comentarios simulados que se asignan a cada post
export const FAKE_COMMENTS: Comment[] = [
  { id: 'c1', username: 'gatito99', text: '¡Qué hermoso! 😍' },
  { id: 'c2', username: 'cat_world', text: 'Me encanta esta foto' },
  { id: 'c3', username: 'purrfect__', text: '🐱🐱🐱' },
  { id: 'c4', username: 'felina.ok', text: 'Amo los gatos 💕' },
  { id: 'c5', username: 'michis.arg', text: 'Qué cara de noble jaja' },
]

// Formatea una fecha pasada en string legible (ej: "hace 3 días")
export const formatRelativeDate = (daysAgo: number): string => {
  if (daysAgo === 0) return 'Hoy'
  if (daysAgo === 1) return 'Hace 1 día'
  return `Hace ${daysAgo} días`
}
