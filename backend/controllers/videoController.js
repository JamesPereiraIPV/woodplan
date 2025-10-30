const db = require("../db");

exports.getAllVideos = (req, res) => {
  db.query("SELECT * FROM videos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const mapped = results.map((r) => ({
      id: r.id,
      src: r.video_url,
      title: r.title,
      thumbnail: r.thumbnail_url,
      created_at: r.created_at,
    }));
    res.json(mapped);
  });
};

exports.uploadVideo = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Nenhum ficheiro enviado!" });
  }

  const videos = req.files.map((file) => ({
    videoUrl: `http://localhost:3000/uploads/videos/${file.filename}`,
    title: req.body.title || "Sem título",
    thumbnail: req.body.thumbnail || null,
  }));

  const insertPromises = videos.map((video) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO videos (video_url, title, thumbnail_url, created_at) VALUES (?, ?, ?, NOW())",
        [video.videoUrl, video.title, video.thumbnail],
        (err, result) => {
          if (err) return reject(err);
          resolve(video.videoUrl);
        }
      );
    });
  });

  Promise.all(insertPromises)
    .then((urls) => {
      res.status(201).json({
        message: "Vídeos carregados com sucesso!",
        videos: urls,
      });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
