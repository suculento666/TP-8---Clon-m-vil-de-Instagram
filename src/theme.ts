// Paleta de colores centralizada de la app
// Al tener todos los colores en un solo lugar, cambiar el tema
// significa editar este archivo y no buscar colores hardcodeados en 20 archivos

export const colors = {
  // Fondos
  bgMain: '#000000',       // fondo negro de Instagram
  bgPanel: '#000000',      // panel/tab bar
  bgCard: '#000000',       // fondo de cada post
  bgInput: '#121212',      // inputs y campos

  // Bordes
  borderColor: '#262626',  // separadores sutiles

  // Textos
  textPrimary: '#ffffff',
  textSecondary: '#a8a8a8',
  textMuted: '#737373',

  // Acento — gradiente de Instagram simplificado a color sólido
  accent: '#c13584',
  accentLight: '#e1306c',

  // Estados
  liked: '#ed4956',        // corazón rojo al likear
  storyRing: '#c13584',    // anillo de historia activa
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
}

export const fontSizes = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
}
