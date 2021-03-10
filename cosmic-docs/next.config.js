const withNextra = require('nextra')({
  theme: 'nextra-theme-docs', 
  themeConfig: './theme.config.js',
  stork: false
})

module.exports = withNextra()
