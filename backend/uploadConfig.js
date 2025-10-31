const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Configuração Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage para Multer usando Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = 'others';
    if (file.fieldname === 'cartazes') folder = 'cartazes';
    if (file.fieldname === 'photos') folder = 'photos';
    if (file.fieldname === 'videos') folder = 'videos';

    return {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'mp4'],
      transformation: file.mimetype.startsWith('image/') 
        ? [{ width: 1920, height: 1080, crop: 'limit' }]
        : undefined
    };
  }
});

// Multer com filtro de tipo e limite de tamanho
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de ficheiro não suportado!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 100 } // até 100 MB
});

module.exports = upload;
