const express = require('express');
const cors = require('cors');
const path = require('path')

const videoRoutes = require('./routes/videos');
const photoRoutes = require('./routes/photos');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir ficheiros estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/videos', videoRoutes);
app.use('/photos', photoRoutes);

app.get('/', (req, res) => res.send('Backend funcionando!'));

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
