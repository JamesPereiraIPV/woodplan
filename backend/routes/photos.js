const express = require('express');
const router = express.Router();
const { getAllPhotos, uploadPhoto } = require('../controllers/photoController');
const { multerUpload } = require('../uploadConfig');

// GET - listar todas as fotos
router.get('/', getAllPhotos);

// POST - upload de nova foto (até 50 arquivos)
router.post('/uploads', multerUpload.array('photos', 100), uploadPhoto);

module.exports = router;
