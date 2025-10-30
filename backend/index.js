const express = require('express');
const cors = require('cors');

const videoRoutes = require('./routes/videos');
const photoRoutes = require('./routes/photos');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/videos', videoRoutes);
app.use('/photos', photoRoutes);

app.get('/', (req, res) => res.send('Backend funcionando!'));

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
