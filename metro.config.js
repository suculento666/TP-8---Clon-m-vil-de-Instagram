const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

// Bloquear la carpeta web/ que contiene el proyecto Vite/DOM original.
// Usamos forward slashes para evitar problemas de escape en Windows.
config.resolver.blockList = [/.*\/web\/.*/]

module.exports = config
