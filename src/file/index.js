import express from 'express'
import { verifyInfo, singleImgUpload, SERVER_BASE_URL, checkFile } from '../_helpers'

const router = express.Router()

router.post('/', async function postImage (req, res) {
  const bearerToken = req.get('Authorization') || 'Bearer '
  const authInfo = bearerToken.split(' ').pop()
  try {
    verifyInfo(authInfo)
  } catch (e) {
    return res.status(400).send({ error: e.message })
  }

  singleImgUpload(req, res, err => {
    if (err) {
      return res.status(400).send({ error: err.message })
    }

    if (!req.files) {
      return res.status(400).send({ error: '请检查文件大小及格式' })
    }

    const files = req.files.map(file => {
      const fileName = checkFile({ fileName: file.filename })
      const imagePath = `${SERVER_BASE_URL}/files/${fileName}`
      return {
        fileName,
        imagePath
      }
    })

    res.status(201).json(files)
  })
})

export default router
