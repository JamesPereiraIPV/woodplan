const db = require('../db');
const { uploadToCloudinary } = require('../uploadConfig');

exports.getAllPhotos = (req, res) => {
  db.query('SELECT * FROM photos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Nenhum ficheiro enviado!' });
    }

    const lastIdResult = await new Promise((resolve, reject) => {
      db.query('SELECT MAX(id) AS lastId FROM photos', (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    const lastId = lastIdResult[0].lastId || 0;

    // Faz upload de todas as fotos para Cloudinary
    const photos = await Promise.all(
      req.files.map(async (file, index) => {
        const result = await uploadToCloudinary(file, 'photos');
        const altText =
          req.body.alt_text && req.files.length === 1
            ? req.body.alt_text
            : `woodplan_${lastId + index + 1}`;
        return [result.secure_url, altText, new Date()];
      })
    );

    // Insere no DB
    const sql = 'INSERT INTO photos (image_url, alt_text, created_at) VALUES ?';
    db.query(sql, [photos], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      const insertedUrls = photos.map((p) => p[0]);
      res.status(201).json({
        message: 'Fotos carregadas com sucesso!',
        photos: insertedUrls,
      });
    });
  } catch (err) {
    console.error('Erro ao enviar fotos:', err);
    res.status(500).json({ error: err.message || err });
  }
};
