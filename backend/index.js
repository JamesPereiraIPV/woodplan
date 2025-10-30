const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Importa middlewares e rotas
const authRoutes = require('./routes/auth');
const { authenticateToken } = require('./controllers/authController');
const videoRoutes = require('./routes/videos');
const photoRoutes = require('./routes/photos');

// Middleware base
app.use(cors());
app.use(express.json());

// Servir ficheiros estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🔐 Rota pública (login)
app.use('/auth', authRoutes);

// 🔒 Rotas protegidas (só com token)
app.use('/videos', authenticateToken, videoRoutes);
app.use('/photos', authenticateToken, photoRoutes);

// Rota teste
app.get('/', (req, res) => res.send('Backend funcionando!'));

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
