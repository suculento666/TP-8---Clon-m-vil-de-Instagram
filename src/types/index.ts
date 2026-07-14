// Respuesta cruda que devuelve The Cat API por cada imagen
export interface CatImage {
  id: string
  url: string
  width: number
  height: number
}

// Un comentario dentro de un post
export interface Comment {
  id: string
  username: string
  text: string
}

// Un post del feed ya construido con datos simulados
export interface Post {
  id: string
  imageUrl: string
  avatarUrl: string
  username: string
  location: string
  caption: string
  likes: number
  date: string
  comments: Comment[]
}

// El usuario activo de la app (no requiere login real)
export interface User {
  username: string
  fullName: string
  bio: string
  avatarUrl: string
  postsCount: number
  followers: number
  following: number
}

// Parámetros que recibe cada pantalla del Stack de navegación
export type HomeStackParamList = {
  Feed: undefined
  Detail: { post: Post }
}

export type ProfileStackParamList = {
  Profile: undefined
}
