const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../controllers/authController');
const { multerUpload } = require('../uploadConfig');
const cartazesController = require('../controllers/cartazesController');

// Upload de cartaz (protegido)
router.post('/uploads', multerUpload.single('cartazes'), cartazesController.uploadCartaz);

// Obter todos os cartazes (público)
router.get('/', cartazesController.getCartazes);

module.exports = router;
