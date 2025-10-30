const db = require('../db');

exports.getAllPhotos = (req, res) => {
  db.query('SELECT * FROM photos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
