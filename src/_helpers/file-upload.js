import fs from 'fs'
import crypto from 'crypto'
import multer from 'multer'
import { resolvePathFromSrc } from './path'

const filesDirUrl = '../public/files'
const filesDescUrl = '../public/files/md5-file.txt'

if (!fs.existsSync(resolvePathFromSrc(filesDirUrl))) {
  fs.mkdirSync(resolvePathFromSrc(filesDirUrl), {
    recursive: true
  })
  fs.appendFileSync(resolvePathFromSrc(filesDescUrl), '', {
    encoding: 'utf-8'
  })
}

function randomStr (length) {
  let str = ''
  for (let i = 0; i < length; i++) {
    str += Math.floor(Math.random() * 10)
  }
  return str
}

function md5 (buffer) {
  return crypto
    .createHash('md5')
    .update(buffer)
    .digest('hex')
}

function getFileMd5Str ({ fileName }) {
  const buffer = fs.readFileSync(resolvePathFromSrc(`${filesDirUrl}/${fileName}`))
  return md5(buffer)
}

function getFilesDesc () {
  return fs.readFileSync(resolvePathFromSrc(filesDescUrl), 'utf-8')
}

function patchFilesDesc ({ md5, fileName }) {
  fs.appendFileSync(resolvePathFromSrc(filesDescUrl), `[md5:${md5}|file:${fileName}]`, 'utf-8')
}

function deleteFile ({ fileName }) {
  fs.unlinkSync(resolvePathFromSrc(`${filesDirUrl}/${fileName}`))
}

function makeMd5Reg ({ md5 }) {
  return new RegExp(`\\[md5:${md5}\\|file:(.*?)\\]`)
}

export function checkFile ({ fileName }) {
  const md5 = getFileMd5Str({ fileName })
  const reg = makeMd5Reg({ md5 })
  const filesDesc = getFilesDesc()

  let retFileName
  const result = reg.exec(filesDesc)
  if (result) {
    retFileName = result[1]
    deleteFile({ fileName })
  } else {
    retFileName = fileName
    patchFilesDesc({ md5, fileName })
  }

  return retFileName
}

const storage = multer.diskStorage({
  destination (req, file, cb) {
    // 图片路径
    cb(null, resolvePathFromSrc(filesDirUrl))
  },
  filename (req, file, cb) {
    const [, ext] = file.mimetype.split('/')
    const strRandom = randomStr(10)
    const timestamp = Date.now()
    const fileName = `${strRandom}${timestamp}.${ext}`
    cb(null, fileName)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    return cb(null, true)
  }
  cb(new Error('请选择照片文件上传'))
}

export const singleImgUpload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10 /* 10MB */
  },
  fileFilter
}).array('image', 15)
