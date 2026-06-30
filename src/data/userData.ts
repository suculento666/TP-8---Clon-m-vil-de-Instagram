import type { User } from '../types';

export const currentUser: User = {
  username: 'Señora M',
  fullName: 'Facunda Eusebich',
  bio: '🐱 Amante de los gatos | Y d lor Mortiz',
  // En React Native los assets locales se importan con require()
  // Asegurate de tener el archivo en assets/leoMattioli.webp
  avatar: 'local', // se reemplaza por require en el componente que lo use
  posts: 10,
  followers: 999,
  following: 163,
};
