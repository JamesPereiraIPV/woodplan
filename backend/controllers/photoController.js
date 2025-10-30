const db = require("../db");

exports.getAllPhotos = (req, res) => {
  db.query("SELECT * FROM photos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.uploadPhoto = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Nenhum ficheiro enviado!" });
  }

  const photos = req.files.map((file) => ({
    imageUrl: `http://localhost:3000/uploads/photos/${file.filename}`,
    altText: req.body.alt_text || "Sem descrição",
  }));

  // Inserir todas no DB (exemplo simplificado)
  photos.forEach((photo) => {
    db.query(
      "INSERT INTO photos (image_url, alt_text, created_at) VALUES (?, ?, NOW())",
      [photo.imageUrl, photo.altText]
    );
  });

  res.status(201).json({
    message: "Fotos carregadas com sucesso!",
    photos: photos.map((p) => p.imageUrl),
  });
};
