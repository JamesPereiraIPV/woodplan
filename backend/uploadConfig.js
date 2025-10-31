const cloudinary = require('cloudinary').v2
const multer = require('multer')
const sharp = require('sharp')
require('dotenv').config()

// Configuração Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Multer em memória
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4']
  if (allowed.includes(file.mimetype)) cb(null, true)
  else cb(new Error('Tipo de ficheiro não suportado!'), false)
}

const multerUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 500 }, // até 500 MB
})

// Função para enviar imagens ou vídeos para Cloudinary
const uploadToCloudinary = (file, folder) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (file.mimetype.startsWith('image/')) {
        const buffer = await sharp(file.buffer)
          .resize({ width: 1920, height: 1080, fit: 'inside' })
          .jpeg({ quality: 80 })
          .toBuffer()

        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'image',
            transformation: [{ quality: 'auto' }],
          },
          (err, result) => (err ? reject(err) : resolve(result))
        )
        uploadStream.end(buffer)
      } else if (file.mimetype === 'video/mp4') {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'video',
            eager: [
              { width: 1280, height: 720, crop: 'limit', quality: 'auto' },
            ],
            eager_async: true, // transforma o vídeo em background
          },
          (err, result) => (err ? reject(err) : resolve(result))
        )

        uploadStream.end(file.buffer)
      } else {
        reject(new Error('Tipo de arquivo não suportado'))
      }
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = { multerUpload, uploadToCloudinary }
