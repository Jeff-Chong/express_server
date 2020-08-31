import cors from 'cors'
import logger from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import { SERVER_PORT, makeExpressCallback } from './_helpers'

import {
  getItems,
  postItem,
  patchItem,
  deleteItem
} from './item/controllers'

import {
  getCategories,
  postCategory,
  patchCategory,
  deleteCategory
} from './category/controllers'

import {
  getHeroes,
  postHero,
  patchHero,
  deleteHero
} from './hero/controllers'

import {
  getArticles,
  postArticle,
  patchArticle,
  deleteArticle
} from './article/controllers'

import {
  signIn,
  signUp
} from './auth/controllers'

import { getConstellations } from './constellation/controllers'

import uploadImageRouter from './file'
const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/files', express.static('public/files', {
  maxAge: 1000 * 60 * 60 * 24 * 30
}))
app.use('/file', uploadImageRouter)

app.post('/sign-up', makeExpressCallback(signUp))
app.post('/sign-in', makeExpressCallback(signIn))

app.get('/items', makeExpressCallback(getItems))
app.get('/items/:id', makeExpressCallback(getItems))
app.post('/items', makeExpressCallback(postItem))
app.patch('/items/:id', makeExpressCallback(patchItem))
app.delete('/items/:id', makeExpressCallback(deleteItem))

app.get('/categories', makeExpressCallback(getCategories))
app.get('/categories/:id', makeExpressCallback(getCategories))
app.post('/categories', makeExpressCallback(postCategory))
app.patch('/categories/:id', makeExpressCallback(patchCategory))
app.delete('/categories/:id', makeExpressCallback(deleteCategory))

app.get('/heroes', makeExpressCallback(getHeroes))
app.get('/heroes/:id', makeExpressCallback(getHeroes))
app.post('/heroes', makeExpressCallback(postHero))
app.patch('/heroes/:id', makeExpressCallback(patchHero))
app.delete('/heroes/:id', makeExpressCallback(deleteHero))

app.get('/articles', makeExpressCallback(getArticles))
app.get('/articles/:id', makeExpressCallback(getArticles))
app.post('/articles', makeExpressCallback(postArticle))
app.patch('/articles/:id', makeExpressCallback(patchArticle))
app.delete('/articles/:id', makeExpressCallback(deleteArticle))

app.get('/constellations', makeExpressCallback(getConstellations))

app.use(makeExpressCallback(() => Promise.resolve({
  headers: {
    'Content-Type': 'application/json'
  },
  body: { error: 'not found' },
  statusCode: 404
})))

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`)
})
