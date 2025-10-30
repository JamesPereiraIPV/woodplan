const db = require('../db');
const path = require('path');

// Upload de cartaz
exports.uploadCartaz = (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Nenhum ficheiro enviado" });

    const { barname, date, location, mapsLink } = req.body;
    const imagePath = `/uploads/cartazes/${req.file.filename}`;

    const sql = `
      INSERT INTO cartazes (barname, image, date, location, mapsLink)
      VALUES (?, ?, ?, ?, ?)
    `;

    const mysqlDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    db.query(sql, [barname, imagePath, mysqlDate, location, mapsLink], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao salvar cartaz no banco" });
      }

      res.status(201).json({
        id: result.insertId,
        barname,
        image: imagePath,
        date,
        location,
        mapsLink
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao carregar cartaz" });
  }
};

// Obter todos os cartazes
exports.getCartazes = (req, res) => {
  const sql = `SELECT * FROM cartazes ORDER BY date ASC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao obter cartazes" });
    }

    res.json(results);
  });
};
