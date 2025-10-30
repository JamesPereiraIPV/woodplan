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

  // Se o usuário não forneceu alt_text, cria altText automático
  const photos = req.files.map((file, index) => {
    let altText = req.body.alt_text;

    // Se houver apenas um alt_text ou nenhum, gera automaticamente
    if (!altText || req.files.length > 1) {
      altText = `woodplan_${index + 1}`;
    }

    return {
      imageUrl: `http://localhost:3000/uploads/photos/${file.filename}`,
      altText: altText,
    };
  });

  // Inserir todas no DB
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
