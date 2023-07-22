const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 4000; // Choisissez le port de votre choix
//TODO : A definir
const accessJWTSecret = process.env.ACCESS_TOKEN_SECRET || 'secret_access_token';
const refreshJWTSecret = process.env.REFRESH_TOKEN_SECRET || 'secret_refresh_token';

const jwt = require('jsonwebtoken');

// Middleware pour autoriser les requêtes cross-origin (CORS)
app.use(cors());

// Middleware pour parser le contenu des requêtes en JSON
app.use(express.json());

// Configuration de la connexion à la base de données MySQL
const dbConfig = {
  host: 'localhost', // Remplacez par le nom d'hôte de votre base de données
  user: 'test', // Remplacez par votre nom d'utilisateur MySQL
  password: 'test', // Remplacez par votre mot de passe MySQL
  database: 'one_piece' // Remplacez par le nom de votre base de données
};

// Création d'une connexion à la base de données
const db = mysql.createConnection(dbConfig);

function generateAccessToken(data) {
    return jwt.sign(data, accessJWTSecret, { expiresIn: '1800s' });
}


// Connexion à la base de données
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Route GET pour l'URL '/'
app.get('/', (req, res) => {
  // Exemple de requête à la base de données
  const sql = 'SHOW DATABASES'; 

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête :', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.json(result);
  });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(
        sql, 
        email, 
        (err, result) => {
            if (err) {
                res.send({ auth: false, err: err });
            }

            if (result.length > 0) {
                if (result[0].password == password) {
                    console.log(result);

                    const id = result[0].id;
                    const email = result[0].email;
                    const token = generateAccessToken({id: id, email: email});
                    
                    res.json({
                        auth: true, 
                        token: token, 
                        result: {id: result[0].id, email: result[0].email, role: result[0].role}
                    }).status(200);
                } else {
                    res.status(401).send({ auth: false, message: "Wrong email/password combination!" });

                }

                /*bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        console.log(result);

                        const id = result[0].id;
                        const token = jwt.sign({id}, jwtSecret, {
                            expiresIn: 300
                        });
                        req.session.user = result;

                        res.json({
                            auth: true, 
                            token: token, 
                            result: result
                        }).status(200);
                    } else {
                        res.send({ message: "Wrong email/password combination!" });
                    }
                });*/
            } else {
                res.status(403).send({ auth: false, message: "User doesn't exist" });
            }
        });

});


const verifyJWT = (req, res, next) => {

    const token = req.headers["x-access-token"];

    if (!token) {
        res.send("No token").status(401);
    } else {
        jwt.verify(token, accessJWTSecret, (err, decoded) => {
            if (err) {
                res.status(403).json({ auth: false, message: "Failed to authenticate" });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }

};

app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.status(200).send({auth: true, message:"Authentifié"});
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});