const db = require("../db");
const { uploadToCloudinary } = require("../uploadConfig");

// GET - listar todos os cartazes
exports.getCartazes = (req, res) => {
  db.query("SELECT * FROM cartazes ORDER BY date ASC", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao obter cartazes" });
    }
    res.json(results);
  });
};

// POST - upload de cartaz para Cloudinary
exports.uploadCartaz = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum ficheiro enviado!" });
    }

    const { barname, date, location, mapsLink } = req.body;

    // Envia para Cloudinary
    const result = await uploadToCloudinary(req.file, "cartazes");
    const imageUrl = result.secure_url; // URL final no Cloudinary

    // Converter data para formato MySQL
    const mysqlDate = new Date(date).toISOString().slice(0, 19).replace("T", " ");

    const sql = `
      INSERT INTO cartazes (barname, image, date, location, mapsLink, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;

    db.query(
      sql,
      [barname, imageUrl, mysqlDate, location, mapsLink],
      (err, resultDb) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro ao salvar cartaz no banco" });
        }

        res.status(201).json({
          id: resultDb.insertId,
          barname,
          image: imageUrl,
          date,
          location,
          mapsLink,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao enviar cartaz" });
  }
};
