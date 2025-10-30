const express = require('express');
const router = express.Router();
const upload = require('../uploadConfig')
const { getAllVideos, uploadVideo } = require('../controllers/videoController');

router.get('/', getAllVideos);

router.post('/uploads', upload.array('videos', 1), uploadVideo);

module.exports = router;
