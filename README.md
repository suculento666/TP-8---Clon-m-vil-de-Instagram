# CatsGram — Clon Móvil de Instagram

Trabajo Práctico N°8 — React Native con Expo  
Migración del TP anterior (Instagram Web en React) hacia una aplicación móvil nativa.

---

## Inicialización del entorno de desarrollo

```bash
npm install
npx expo start
```

Escaneá el QR con la app **Expo Go** (iOS o Android) para ver la app en tu dispositivo.

---

## Referencia visual (Figma)

Diseño de referencia utilizado:  
🔗 https://www.figma.com/community/file/877585925040453925

---

## Árbol de directorios

```
src/
├── assets/               # Imágenes estáticas (icon, splash, adaptive-icon)
├── components/
│   ├── Header.tsx
│   ├── Feed/
│   │   ├── ActionBar.tsx
│   │   ├── Feed.tsx
│   │   └── PostCard.tsx
│   ├── Stories/
│   │   ├── Stories.tsx
│   │   └── StoryItem.tsx
│   ├── PostDetail/
│   │   ├── Comment.tsx
│   │   └── PostDetail.tsx
│   └── Profile/
│       ├── ProfileGrid.tsx
│       └── ProfileHeader.tsx
├── data/
│   └── userData.ts       # Usuario activo simulado (sin login real)
├── hooks/
│   └── useCats.ts        # Hook que maneja loading / error / posts
├── navigation/
│   ├── BottomTabs.tsx    # Tab bar inferior (Home + Perfil)
│   ├── HomeStack.tsx     # Stack Feed → Detalle
│   └── ProfileStack.tsx  # Stack de Perfil
├── screens/
│   ├── FeedScreen.tsx
│   ├── DetailScreen.tsx
│   └── ProfileScreen.tsx
├── services/
│   └── catService.ts     # Comunicación con The Cat API via Axios
├── types/
│   └── index.ts          # Interfaces TypeScript del proyecto
├── utils/
│   └── fakeData.ts       # Usernames, captions y comentarios simulados
└── theme.ts              # Paleta de colores, espaciados y tamaños de fuente
```

---

## Desglose técnico de componentes

### `Header`
Barra superior con el logo y los íconos de acción (nueva publicación, notificaciones, mensajes).  
No conoce la API ni los posts — solo muestra la UI.

### `Stories` + `StoryItem`
`Stories` recibe el array de posts y renderiza un carrusel horizontal usando `ScrollView`.  
`StoryItem` muestra una sola historia: imagen circular con anillo de color y nombre de usuario.

### `Feed`
Envuelve la `FlatList` de posts. Responsabilidad única: renderizar la lista de forma eficiente.  
Recibe `ListHeaderComponent` para que las Stories scrolleen junto con los posts.  
**FlatList es obligatorio** — solo renderiza los ítems visibles, a diferencia de `.map()` que renderiza todos a la vez.

### `PostCard`
El componente central del feed. Muestra avatar, username, ubicación, imagen, barra de acciones, contador de likes y caption.  
No maneja estado propio — el like lo gestiona `FeedScreen` y llega por props.  
Usa `ActionBar` para los botones de acción.

### `ActionBar`
Barra de like / comentar / compartir / guardar.  
Separada de `PostCard` para poder reutilizarse en `DetailScreen` sin duplicar código.

### `PostDetail`
Vista extendida de un post. Maneja el like con `useState` local para interacción en tiempo real.  
El `initialLiked` llega por props desde `DetailScreen`.

### `Comment`
Componente atómico que muestra un comentario: username en negrita + texto.

### `ProfileHeader`
Sección superior del perfil: avatar, métricas (publicaciones / seguidores / seguidos), nombre, bio y botón editar.  
Recibe el usuario por props desde `ProfileScreen`.

### `ProfileGrid`
Cuadrícula de imágenes del perfil.  
Usa `FlatList` con `numColumns={3}` — requisito explícito de la consigna.  
El tamaño de cada celda se calcula como `(ancho de pantalla - 2) / 3` para que las 3 columnas sean exactamente simétricas.

---

## Estados del proyecto

### Estados globales (a nivel Screen)

| Screen | Estado | Tipo | Descripción |
|---|---|---|---|
| `FeedScreen` | `likedIds` | `Set<string>` | IDs de posts likeados |
| `FeedScreen` | `posts`, `loading`, `error` | via `useCats` | Datos de la API |

### Estados locales (a nivel componente)

| Componente | Estado | Tipo | Descripción |
|---|---|---|---|
| `PostDetail` | `liked` | `boolean` | Like en tiempo real |
| `PostDetail` | `likesCount` | `number` | Contador que se actualiza al instante |

### Hook personalizado

**`useCats`** — maneja los tres estados del ciclo de vida de un fetch asíncrono:
- `loading: boolean` — mientras espera la respuesta
- `error: string | null` — si la petición falla
- `posts: Post[]` — los datos ya transformados

Llama a `catService.fetchPosts()` en un `useEffect` con array vacío `[]` — se ejecuta una sola vez al montar el componente.

---

## Flujo de datos

```
The Cat API
    ↓ axios.get (Promise.all: imágenes + avatares)
catService.fetchPosts()
    ↓ transforma CatImage[] → Post[]
useCats (useEffect + useState)
    ↓ { posts, loading, error }
FeedScreen
    ↓ props
Feed → PostCard → ActionBar
    ↓ navigation.navigate('Detail', { post })
DetailScreen → PostDetail
```

---

## Tecnologías utilizadas

- **React Native 0.79** + **Expo SDK 56**
- **TypeScript** — tipado estático en toda la app
- **React Navigation v6** — Stack Navigator + Bottom Tab Navigator
- **Axios** — peticiones HTTP a The Cat API
- **expo-splash-screen** — control de la pantalla de carga
- **expo-status-bar** — StatusBar estilizada en modo light
- **@expo/vector-icons (Ionicons)** — iconografía nativa
- **react-native-safe-area-context** — protección de notches y barras del sistema
