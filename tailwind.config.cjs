const tokens = require('./design/tailwind.tokens.js')
module.exports = { content: ['./src/**/*.{js,ts,jsx,tsx}','./index.html'], theme: { extend: { colors: { primary: tokens.colors }, spacing: tokens.spacing, borderRadius: tokens.radius, fontFamily: { sans: [tokens.font.family] } } }, plugins: [] }
