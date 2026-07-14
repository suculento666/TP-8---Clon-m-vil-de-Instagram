// Datos del usuario activo de la app
// No requiere login real — simula un perfil ya autenticado

import type { User } from '../types'

export const currentUser: User = {
  username: 'señora.m',
  fullName: 'Facunda Eusebich',
  bio: '🐱 Amante de los gatos | 📍 Buenos Aires',
  avatarUrl: 'https://placecats.com/86/86',
  postsCount: 12,
  followers: 999,
  following: 163,
}
