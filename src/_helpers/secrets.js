import fs from 'fs'
import { resolvePathFromSrc } from './path'
import dotenv from 'dotenv'

if (fs.existsSync(resolvePathFromSrc('../.env'))) {
  console.log('使用 .env 文件加载环境变量')
  dotenv.config({ path: resolvePathFromSrc('../.env') })
} else {
  console.log('使用 .env.example 文件加载环境变量')
  dotenv.config({ path: resolvePathFromSrc('../.env.example') })
}

const CONSTELLATION_API_URL = process.env.JUHE_CONSTELLATIONS_API_URL

const CONSTELLATIONS_APP_KEY = process.env.JUHE_CONSTELLATIONS_APP_KEY
// exports.CONSTELLATIONS_APP_KEY = CONSTELLATIONS_APP_KEY

const SERVER_PORT = process.env.SERVER_PORT || 8848
const SERVER_BASE_URL = process.env.SERVER_BASE_URL

const JWT_SECRET = process.env.JWT_SECRET
const JWT_ADMIN_NAME = process.env.JWT_ADMIN_NAME

const ITEMS_DB_URL = process.env.ITEMS_DB_URL
const ITEMS_DB_NAME = process.env.ITEMS_DB_NAME

const CATEGORIES_DB_URL = process.env.CATEGORIES_DB_URL
const CATEGORIES_DB_NAME = process.env.CATEGORIES_DB_NAME

const HEROES_DB_URL = process.env.HEROES_DB_URL
const HEROES_DB_NAME = process.env.HEROES_DB_NAME

const ARTICLES_DB_URL = process.env.HEROES_DB_URL
const ARTICLES_DB_NAME = process.env.HEROES_DB_NAME

const USERS_DB_URL = process.env.USERS_DB_URL
const USERS_DB_NAME = process.env.USERS_DB_NAME

console.log(`
  SERVER_PORT: ${SERVER_PORT}\n
  SERVER_BASE_URL: ${SERVER_BASE_URL}\n
  JWT_SECRET: ${JWT_SECRET}\n
  JWT_ADMIN_NAME: ${JWT_ADMIN_NAME}\n
  ITEMS_DB_URL: ${ITEMS_DB_URL}\n
  ITEMS_DB_NAME: ${ITEMS_DB_NAME}\n
  CATEGORIES_DB_URL: ${CATEGORIES_DB_URL}\n
  CATEGORIES_DB_NAME: ${CATEGORIES_DB_NAME}\n
  HEROES_DB_URL: ${HEROES_DB_URL}\n
  HEROES_DB_NAME: ${HEROES_DB_NAME}\n
  ARTICLES_DB_URL: ${ARTICLES_DB_URL}\n
  ARTICLES_DB_NAME: ${ARTICLES_DB_NAME}\n
  USERS_DB_URL: ${USERS_DB_URL}\n
  USERS_DB_NAME: ${USERS_DB_NAME}\n
  CONSTELLATION_API_URL: ${CONSTELLATION_API_URL}\n
  CONSTELLATIONS_APP_KEY: ${CONSTELLATIONS_APP_KEY}\n
`)

if (!CONSTELLATIONS_APP_KEY) {
  console.log('没有密钥，请设置 JUHE_CONSTELLATIONS_API_URL 环境变量')
  process.exit(1)
}
if (!CONSTELLATION_API_URL) {
  console.log('没有接口地址，请设置 JUHE_CONSTELLATIONS_APP_KEY 环境变量')
  process.exit(1)
}

export {
  SERVER_PORT,
  SERVER_BASE_URL,

  JWT_SECRET,
  JWT_ADMIN_NAME,

  ITEMS_DB_URL,
  ITEMS_DB_NAME,

  CATEGORIES_DB_URL,
  CATEGORIES_DB_NAME,

  HEROES_DB_URL,
  HEROES_DB_NAME,

  USERS_DB_URL,
  USERS_DB_NAME,

  ARTICLES_DB_URL,
  ARTICLES_DB_NAME,

  CONSTELLATION_API_URL,
  CONSTELLATIONS_APP_KEY
}
