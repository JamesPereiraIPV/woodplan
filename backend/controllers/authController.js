const jwt = require("jsonwebtoken");

const USER = "woodplancontact@gmail.com";
const PASS = "planodemadeira2021";
const SECRET = process.env.JWT_SECRET || "minha_chave_secreta";

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email === USER && password === PASS) {
    // Cria token JWT válido por 1h
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ mmessage: "Credenciais inválidas" });
  }
};

// Middleware para proteger rotas

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
