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
