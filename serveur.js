const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const PORT = 3000;

// Middleware pour parser le JSON dans le corps des requêtes
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur notre serveur Express.js !</h1>');
});

app.use('/', userRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});