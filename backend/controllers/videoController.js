const db = require('../db');
const { uploadToCloudinary } = require('../uploadConfig');

// Listar todos os vídeos
exports.getAllVideos = (req, res) => {
  db.query('SELECT * FROM videos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const mapped = results.map(r => ({
      id: r.id,
      src: r.video_url,
      title: r.title,
      thumbnail: r.thumbnail_url,
      created_at: r.created_at,
    }));
    res.json(mapped);
  });
};

// Upload de vídeos
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Nenhum ficheiro enviado!' });
    }

    const lastIdResult = await new Promise((resolve, reject) => {
      db.query('SELECT MAX(id) AS lastId FROM videos', (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    const lastId = lastIdResult[0].lastId || 0;

    // Faz upload de todos os vídeos para Cloudinary
    const videos = await Promise.all(
      req.files.map(async (file, index) => {
        const result = await uploadToCloudinary(file, 'videos');
        return {
          videoUrl: result.secure_url,
          title: req.body.title || `woodplan_${lastId + index + 1}`,
          thumbnail: req.body.thumbnail || null
        };
      })
    );

    // Insere no DB
    const insertPromises = videos.map(video => new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO videos (video_url, title, thumbnail_url, created_at) VALUES (?, ?, ?, NOW())',
        [video.videoUrl, video.title, video.thumbnail],
        (err) => err ? reject(err) : resolve(video)
      );
    }));

    const insertedVideos = await Promise.all(insertPromises);

    res.status(201).json({
      message: 'Vídeos carregados com sucesso!',
      videos: insertedVideos,
    });
  } catch (err) {
    console.error('Erro no upload de vídeo:', err);
    res.status(500).json({ error: err.message || err });
  }
};
