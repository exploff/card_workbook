const userController = require('./controllers/userController');
const setsController = require('./controllers/setsController');
const cardsController = require('./controllers/cardsController');
const verifyJWT = require('./middlewares/jwtMiddleware'); // Importez directement le middleware
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000; // Choisissez le port de votre choix

// Middleware pour autoriser les requêtes cross-origin (CORS)
app.use(cors());

// Middleware pour parser le contenu des requêtes en JSON
app.use(express.json());

// Route GET pour l'URL '/'
app.get('/', (req, res) => {
    res.send('UP');
});

app.post('/login', userController.login);

app.get('/isUserAuth', verifyJWT, userController.isUserAuth);

app.get('/sets', setsController.getSets);

app.post('/create-set', verifyJWT, setsController.createSet);

app.delete('/delete-set/:setId', verifyJWT, setsController.deleteSet);

app.get('/cards', verifyJWT, cardsController.getCards);

app.post('/create-card', verifyJWT, cardsController.createCard);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});