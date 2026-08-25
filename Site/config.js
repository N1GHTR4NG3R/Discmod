const { name } = require('./package.json')

const development = {
  vue: {
    port: process.env.VUE_PORT || 8080
  },

  express: {
    port: process.env.EXPRESS_PORT || 8085
  },
}

const production = {
  port: 80
}

const meta = {
  title: name,
  description: 'A cool fullstack website.',
  thumbnail: 'https://example.com/thumb.png',
  themeColor: '#ff4c67',
  url: 'https://example.com'
}

module.exports = {
  meta,
  development,
  production
}