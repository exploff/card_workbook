const mysql = require('mysql');

const dbConfig = {
  host: 'localhost', // Remplacez par le nom d'hôte de votre base de données
  user: 'test', // Remplacez par votre nom d'utilisateur MySQL
  password: 'test', // Remplacez par votre mot de passe MySQL
  database: 'one_piece' // Remplacez par le nom de votre base de données
};

// Création d'une connexion à la base de données
const db = mysql.createConnection(dbConfig);

// Connexion à la base de données
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = db;
