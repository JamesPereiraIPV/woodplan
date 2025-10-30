const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../controllers/authController');
const upload = require('../uploadConfig');
const cartazesController = require('../controllers/cartazesController');

// Upload de cartaz (protegido)
router.post('/uploads', upload.single('cartazes'), cartazesController.uploadCartaz);

// Obter todos os cartazes (público)
router.get('/', cartazesController.getCartazes);

module.exports = router;