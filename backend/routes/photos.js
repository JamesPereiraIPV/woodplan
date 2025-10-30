const express = require('express');
const router = express.Router();
const { getAllPhotos } = require('../controllers/photoController');

router.get('/', getAllPhotos);

module.exports = router;
