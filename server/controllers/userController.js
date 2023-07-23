const bcrypt = require('bcrypt');
const db = require('../mysql/database'); // Importez le module de connexion à la base de données
const jwtUtils = require('../utils/jwtUtils');


exports.login = (req, res) => {
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
                    const token = jwtUtils.generateAccessToken({ id: id, email: email });

                    res.json({
                        auth: true,
                        token: token,
                        result: { id: result[0].id, email: result[0].email, role: result[0].role }
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
        }
    );
}


exports.isUserAuth = (req, res) => {
    res.status(200).send({ auth: true, message: "Authentifié" });
}