const express = require('express');
const router = express.Router();
const { multerUpload } = require('../uploadConfig');
const { getAllVideos, uploadVideo } = require('../controllers/videoController');

router.get('/', getAllVideos);

router.post(
  '/uploads',
  (req, res, next) => {
    console.log('Recebendo requisição POST /videos/uploads');
    next();
  },
  (req, res, next) => {
    multerUpload.array('videos', 1)(req, res, (err) => {
      if (err) {
        console.error('Erro do Multer:', err.message);
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  uploadVideo
);

module.exports = router;
