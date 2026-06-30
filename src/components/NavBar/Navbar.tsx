import React from 'react'
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'

interface NavbarProps {
  onNavigate: (view: 'feed' | 'profile') => void
  // activeView viene del App web pero en mobile no se usa (la navegación la hace el tab bar)
  activeView?: 'feed' | 'profile'
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  return (
    <View style={styles.navbar}>
      <View style={styles.inner}>

        {/* Logo */}
        <Pressable
          onPress={() => onNavigate('feed')}
          accessibilityLabel="Inicio"
        >
          <Text style={styles.logoText}>Catsgram</Text>
        </Pressable>

        {/* Buscador */}
        <View style={styles.buscador}>
          <TextInput
            placeholder="Buscar michis..."
            placeholderTextColor="#aaa"
            style={styles.buscarInput}
            accessibilityLabel="Buscar"
          />
        </View>

        {/* Íconos de la derecha */}
        <View style={styles.navIcons}>
          <Pressable style={styles.iconBtn} accessibilityLabel="Configuración">
            <Text style={styles.iconText}>⚙️</Text>
          </Pressable>
          <Pressable style={styles.iconBtn} accessibilityLabel="Cámara">
            <Text style={styles.iconText}>📷</Text>
          </Pressable>
          <Pressable style={styles.iconBtn} accessibilityLabel="Mensajes">
            <Text style={styles.iconText}>✈️</Text>
          </Pressable>
          <Pressable style={styles.newPostBtn} accessibilityLabel="Nueva publicación">
            <Text style={styles.newPostText}>⊕ New Post</Text>
          </Pressable>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    backgroundColor: '#12121f',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  inner: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
  },

  // Logo
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#c13584', // color fijo ya que RN no soporta gradient en texto sin librerías extra
  },

  // Buscador
  buscador: {
    flex: 1,
  },
  buscarInput: {
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#2a2a3e',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    fontSize: 13,
    color: '#fff',
  },

  // Íconos
  navIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
  },

  // Botón New Post
  newPostBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#c13584',
  },
  newPostText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
})

export default Navbar
