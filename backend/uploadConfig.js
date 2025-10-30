const multer = require("multer");
const path = require("path");

// Diretório onde os ficheiros vão ser guardados

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Escolhe a pasta com base no fieldname
    let folder = "uploads/";

    if (file.fieldname === "photos" || file.mimetype.startsWith("image/")) {
      folder += "photos/";
    } else if (
      file.fieldname === "video" ||
      file.mimetype.startsWith("video/")
    ) {
      folder += "videos/";
    }

    cb(null, path.join(__dirname, folder));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Filtros (aceitar apenas imagens e vídeos)

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de ficheiro não suportado!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 100 }, // até 100 MB
});

module.exports = upload;
