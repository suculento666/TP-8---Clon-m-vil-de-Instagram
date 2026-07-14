// Datos del usuario activo de la app
// No requiere login real — simula un perfil ya autenticado

import type { User } from '../types'

export const currentUser: User = {
  username: 'señora.m',
  fullName: 'Facunda Eusebich',
  bio: '🐱 Amante de los gatos | 📍 Buenos Aires',
  // URL de avatar de placeholder mientras no haya asset local
  avatarUrl: 'https://api.thecatapi.com/v1/images/search?limit=1',
  postsCount: 12,
  followers: 999,
  following: 163,
}
