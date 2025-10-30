const express = require('express');
const router = express.Router();
const { getAllPhotos, uploadPhoto } = require('../controllers/photoController');
const upload = require('../uploadConfig')

// GET - listar todas as fotos
router.get('/', getAllPhotos);

// POST - upload de nova foto
router.post('/uploads', upload.array('photos', 50), uploadPhoto);

module.exports = router;
