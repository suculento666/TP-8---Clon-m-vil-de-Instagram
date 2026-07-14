# CatsGram 🐱

Clon móvil de Instagram desarrollado con React Native y Expo.  
Trabajo Práctico N°8 — migración del TP anterior (Instagram Web en React) a una app nativa para celular.

En lugar de posteos de personas, el feed carga fotos de gatos en tiempo real desde [The Cat API](https://thecatapi.com/).

---

## Cómo correr el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npx expo start
```

Escaneá el QR con **Expo Go** (disponible en App Store y Play Store) para ver la app en tu celular.

Si tuviste errores antes y querés limpiar el caché de Metro:
```bash
npx expo start --clear
```

---

## Referencia visual

Diseño de referencia utilizado como guía visual:  
🔗 [Instagram Mobile UI — Figma Community](https://www.figma.com/community/file/877585925040453925)

---

## Árbol de directorios

```
CatsGram/
│
├── App.tsx                        # Punto de entrada. Monta providers y navegación.
├── app.json                       # Configuración de Expo (nombre, ícono, splash).
├── package.json                   # Dependencias del proyecto.
│
└── src/
    ├── theme.ts                   # Colores, espaciados y tamaños de fuente centralizados.
    │
    ├── types/
    │   └── index.ts               # Interfaces TypeScript: Post, User, Comment, etc.
    │
    ├── data/
    │   └── userData.ts            # Datos del usuario activo (sin login real).
    │
    ├── utils/
    │   └── fakeData.ts            # Usernames, captions y comentarios inventados.
    │
    ├── services/
    │   └── catService.ts          # Habla con The Cat API via Axios.
    │
    ├── hooks/
    │   └── useCats.ts             # Hook que descarga los posts y maneja loading/error.
    │
    ├── navigation/
    │   ├── BottomTabs.tsx         # Barra inferior con las dos tabs (Home y Perfil).
    │   ├── HomeStack.tsx          # Stack Feed → Detalle.
    │   └── ProfileStack.tsx       # Stack del Perfil.
    │
    ├── screens/
    │   ├── FeedScreen.tsx         # Pantalla principal con el feed.
    │   ├── DetailScreen.tsx       # Pantalla de detalle de un post.
    │   └── ProfileScreen.tsx      # Pantalla del perfil del usuario.
    │
    └── components/
        ├── Header.tsx             # Barra superior con logo e íconos.
        ├── Stories/
        │   ├── Stories.tsx        # Carrusel horizontal de historias.
        │   └── StoryItem.tsx      # Una sola historia (círculo + nombre).
        ├── Feed/
        │   ├── Feed.tsx           # FlatList que renderiza los PostCards.
        │   ├── PostCard.tsx       # Una sola publicación del feed.
        │   └── ActionBar.tsx      # Botones de like, comentar, compartir, guardar.
        ├── PostDetail/
        │   ├── PostDetail.tsx     # Vista extendida de un post.
        │   └── Comment.tsx        # Un solo comentario.
        └── Profile/
            ├── ProfileHeader.tsx  # Info del usuario (avatar, stats, bio).
            └── ProfileGrid.tsx    # Grilla de 3 columnas con las fotos.
```

---

## Desglose técnico de cada archivo

### `App.tsx`
El punto de entrada de toda la app. Hace tres cosas:
1. Le dice a la splash screen que no se esconda sola (`preventAutoHideAsync`).
2. Espera a que la app esté lista y recién entonces la oculta (`hideAsync`).
3. Monta los providers necesarios: `SafeAreaProvider` (para notches), `StatusBar` en modo light (texto blanco) y `NavigationContainer` (contexto global de navegación).

---

### `src/types/index.ts`
El "diccionario" del proyecto. Define la forma exacta que tienen los datos:
- `CatImage` → lo que devuelve la API cruda (id + url + dimensiones).
- `Post` → la publicación ya armada con datos simulados (username, likes, comentarios, etc.).
- `User` → el perfil del usuario activo.
- `Comment` → un comentario dentro de un post.
- `HomeStackParamList` y `ProfileStackParamList` → le dicen a TypeScript qué parámetros acepta cada pantalla de la navegación. Así si pasás datos mal entre pantallas, TypeScript te avisa antes de correr la app.

---

### `src/theme.ts`
La paleta de colores, espaciados y tamaños de fuente de toda la app, en un solo lugar. En lugar de escribir `'#000000'` en 20 archivos, escribís `colors.bgMain`. Si mañana querés cambiar un color, lo cambiás acá y se actualiza en toda la app automáticamente.

---

### `src/utils/fakeData.ts`
Guarda los datos inventados que se usan para simular publicaciones reales: listas de usernames, ubicaciones, captions y comentarios. También tiene `formatRelativeDate`, una función que convierte un número de días en texto legible ("Hoy", "Hace 1 día", "Hace 3 días").

Se separó acá para que `catService` quede limpio y solo se encargue de hablar con la API.

---

### `src/services/catService.ts`
La única parte del proyecto que sabe cómo hablar con The Cat API. Tiene dos funciones:
- `fetchCatImages(limit)` → hace un `GET` a la API y devuelve N imágenes.
- `fetchPosts()` → hace dos pedidos en paralelo con `Promise.all` (uno para las imágenes del feed y otro para los avatares), y combina los resultados con los datos de `fakeData` para armar los objetos `Post` completos.

Si mañana cambiás de The Cat API a otra API de imágenes, solo tocás este archivo.

---

### `src/hooks/useCats.ts`
Un hook personalizado que cualquier pantalla puede usar para obtener los posts. Internamente maneja tres estados: `loading` (mientras espera), `error` (si algo falla) y `posts` (los datos listos). Llama a `catService.fetchPosts()` dentro de un `useEffect` con array vacío `[]`, lo que garantiza que el pedido a la API se hace **una sola vez** cuando el componente se monta.

---

### `src/data/userData.ts`
Los datos del usuario activo de la app (nombre, bio, seguidores, etc.). No hay login real — se simula un usuario ya autenticado. Cualquier pantalla que necesite mostrar el perfil importa `currentUser` desde acá.

---

### `src/navigation/BottomTabs.tsx`
La barra de navegación inferior con dos tabs: Home (ícono de casita) y Perfil (ícono de persona). Cada tab carga un Stack completo, lo que hace que cada tab tenga su propio historial de navegación independiente. Los íconos cambian entre "relleno" y "contorno" según cuál tab está activa.

---

### `src/navigation/HomeStack.tsx`
El stack de navegación de la tab Home. Apila dos pantallas como cartas:
- `Feed` → pantalla inicial, sin header propio.
- `Detail` → cuando navegás a un post, se apila encima con un header nativo que incluye el botón de volver automáticamente.

---

### `src/navigation/ProfileStack.tsx`
El stack de la tab Perfil. Por ahora tiene solo una pantalla (`ProfileScreen`). Está en un Stack para que en el futuro se puedan agregar más pantallas (como "Editar perfil") sin tocar el resto de la navegación.

---

### `src/screens/FeedScreen.tsx`
La pantalla principal. Es la que más responsabilidades tiene:
- Llama a `useCats` para obtener los posts.
- Maneja el estado `likedIds` (un `Set` de IDs de posts likeados). Se usa `Set` porque garantiza que no haya duplicados.
- `handleToggleLike` agrega o quita un ID del Set dependiendo de si ya estaba o no.
- `handleSelectPost` navega a `DetailScreen` pasando el post completo como parámetro.
- Mientras cargan los datos muestra un spinner; si hay error muestra el mensaje.

---

### `src/screens/DetailScreen.tsx`
La pantalla de detalle de un post. No llama a ninguna API porque ya tiene todos los datos — los recibe de `FeedScreen` a través de `route.params.post`. Solo monta `PostDetail` y le pasa el post.

---

### `src/screens/ProfileScreen.tsx`
La pantalla del perfil. Llama a `useCats` para mostrar las mismas fotos del feed en la grilla. Usa `useNavigation` con el tipo de `HomeStack` para poder navegar a `DetailScreen` aunque vive en otro stack (el `ProfileStack`).

---

### `src/components/Header.tsx`
La barra superior negra con el logo "Catsgram" en cursiva y tres íconos a la derecha (agregar publicación, notificaciones, mensajes). No recibe props ni maneja estado — siempre muestra lo mismo. Es puro visual.

---

### `src/components/Stories/StoryItem.tsx`
Muestra **una sola** historia: un círculo con imagen y el nombre de usuario abajo. El anillo de color alrededor de la imagen simula las historias no vistas de Instagram. Recibe `username` e `imageUrl` por props y no sabe de dónde vienen esos datos.

---

### `src/components/Stories/Stories.tsx`
Muestra el carrusel horizontal de historias. Recibe el array de posts y renderiza un `StoryItem` por cada uno. Usa `ScrollView` horizontal porque la cantidad de ítems es fija y pequeña (~12). No maneja estado propio.

---

### `src/components/Feed/ActionBar.tsx`
La fila de botones debajo de cada foto: corazón (like), burbuja (comentar), avión de papel (compartir) y marcador (guardar). Está separada de `PostCard` para poder reutilizarse también en `PostDetail` sin copiar código. No maneja estado — recibe `liked` por props y llama a `onLike` cuando el usuario toca el corazón.

---

### `src/components/Feed/PostCard.tsx`
La tarjeta de una publicación del feed. Muestra el avatar, username, ubicación, la imagen cuadrada, los botones de acción, el contador de likes y la caption. No maneja estado propio: el `liked` viene de `FeedScreen` por props. Al tocar la imagen llama a `onSelect` para que `FeedScreen` decida cómo navegar.

---

### `src/components/Feed/Feed.tsx`
Envuelve la `FlatList` que renderiza los posts. Su única responsabilidad es mostrar la lista de forma eficiente. `FlatList` solo renderiza los ítems que están visibles en pantalla, lo que hace que el scroll sea fluido incluso con cientos de posts. Recibe `ListHeaderComponent` para que las Stories scrolleen junto con los posts (en lugar de quedar fijas arriba).

---

### `src/components/PostDetail/Comment.tsx`
Muestra **un solo** comentario: el username en negrita y el texto a continuación. Componente mínimo, sin lógica ni estado.

---

### `src/components/PostDetail/PostDetail.tsx`
La vista completa de un post cuando lo abrís. Acá sí hay estado local: `liked` y `likesCount` se manejan con `useState` para que el corazón y el número cambien en tiempo real al tocar. El `initialLiked` viene como prop para arrancar con el estado correcto. Muestra la imagen grande, los botones (reutiliza `ActionBar`), los likes, la caption y la lista de comentarios.

---

### `src/components/Profile/ProfileHeader.tsx`
La parte superior de la pantalla de perfil: avatar, las tres métricas (publicaciones, seguidores, seguidos), nombre completo, bio y el botón "Editar perfil". Tiene un componente interno `Stat` para no repetir el mismo bloque de estilos tres veces. Recibe el `user` por props desde `ProfileScreen`.

---

### `src/components/Profile/ProfileGrid.tsx`
La grilla de fotos del perfil. Usa `FlatList` con `numColumns={3}` (requisito explícito de la consigna). El tamaño de cada celda se calcula como `(ancho de pantalla - 2) / 3` para que las tres columnas sean exactamente simétricas sin que ninguna se desborde. Al tocar una foto llama a `onSelectPost` para navegar al detalle.

---

## Flujo de datos

```
The Cat API
    │
    │  axios.get() × 2 en paralelo (Promise.all)
    ▼
catService.fetchPosts()
    │
    │  combina imágenes + avatares + fakeData → Post[]
    ▼
useCats (useEffect + useState)
    │
    │  devuelve { posts, loading, error }
    ▼
FeedScreen
    │
    ├──▶ Feed ──▶ PostCard ──▶ ActionBar
    │
    └──▶ navigation.navigate('Detail', { post })
              │
              ▼
         DetailScreen ──▶ PostDetail ──▶ ActionBar
                                     └──▶ Comment
```

---

## Estados del proyecto

| Dónde vive | Estado | Tipo | Para qué sirve |
|---|---|---|---|
| `FeedScreen` | `likedIds` | `Set<string>` | Guarda qué posts tiene likeados el usuario |
| `useCats` | `posts` | `Post[]` | Los posts cargados de la API |
| `useCats` | `loading` | `boolean` | Si el pedido a la API todavía está en curso |
| `useCats` | `error` | `string \| null` | Si el pedido a la API falló |
| `PostDetail` | `liked` | `boolean` | Si el post está likeado en el detalle |
| `PostDetail` | `likesCount` | `number` | El contador de likes que cambia en tiempo real |

---

## Tecnologías utilizadas

| Tecnología | Para qué se usa |
|---|---|
| React Native 0.79 + Expo SDK 56 | Base de la app móvil |
| TypeScript | Tipado estático en todo el proyecto |
| React Navigation v6 | Stack Navigator + Bottom Tab Navigator |
| Axios | Peticiones HTTP a The Cat API |
| expo-splash-screen | Control de la pantalla de carga inicial |
| expo-status-bar | StatusBar en modo light (texto blanco) |
| @expo/vector-icons (Ionicons) | Íconos del tab bar y la ActionBar |
| react-native-safe-area-context | Protección de notches y barras del sistema |
