const chalk = require('chalk')
const path = require('path')
const express = require('express')

const config = require('../config.js')

const router = require('./router')

const app = express()

const { NODE_ENV } = process.env

const port = NODE_ENV === 'development'
  ? config.development.express.port
  : config.production.port

app.use(express.json())

app.use(router)

if (NODE_ENV !== 'development') {
  app.use('/', express.static(path.resolve('dist')))
  app.use('*', (req, res) => res.sendFile(path.resolve('dist', 'index.html')))
}

app.listen(port)

console.log(`\n${chalk.bgGreen.black(' SERVER ')} ${chalk.bold(`Listening on port ${port}`)}\n`)