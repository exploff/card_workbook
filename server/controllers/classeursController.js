const { dataToCard, cardToData } = require('../models/Card');
const { classeurToData, dataToClasseur } = require('../models/Classeur');
const db = require('../mysql/database');

exports.getClasseurs = (req, res) => {
    const userId = req.userId.id;
    const sql = "SELECT * FROM classeur WHERE user_id = ?";
    db.query(sql, userId, (err, result) => {
        if (err) {
            res.status(500).send({message: "Error while getting cards"});
            console.error(err);
        } else {
            res.status(200).send(classeurToData(result));
        }
    })
}

exports.createClasseur = (req, res) => {
    const userId = req.userId.id;
    const data = req.body;
    data.userId = userId;
    const classeur = dataToClasseur(data);
    if (!classeur.name || !classeur.user_id) {
        res.status(400).send({message: "Missing parameters"});
        return;
    }

    if (!classeur.card_map) {
        classeur.card_map = "[]";
    }

    const sql = "INSERT INTO classeur (name, user_id, card_map) VALUES (?, ?, ?)";
    db.query(
        sql,
        [classeur.name, classeur.user_id, classeur.card_map],
        (err, result) => {
            if (err) {
                res.status(500).send({message: "Error while creating classeur"});
                console.error(err);
            } else {
                res.status(200).send({message: "Classeur created"});
            }
        }
    )
}

exports.getClasseurCards = (req, res) => {
    const classeur = req.body.classeur;
    const sql = "SELECT * FROM card WHERE id IN (?) ORDER BY id";
    db.query(sql, [classeur.cardMap], (err, result) => {
        if (err) {
            res.status(500).send({message: "Error while getting cards"});
            console.error(err);
        } else {
            res.status(200).send(cardToData(result));
        }
    })
}

exports.addCardToClasseur = (req, res) => {
    let classeur = req.body.classeur;
    let cardId = req.body.cardId;

    if (!classeur || !cardId) {
        res.status(400).send({message: "Missing parameters"});
        return;
    }

    let cardMap = classeur.cardMap ? classeur.cardMap : [];
    cardMap.push(cardId);

    //Suppression des doublons
    cardMap = [...new Set(cardMap)];

    cardMap = JSON.stringify(cardMap);

    updateCardMapClasseur(cardMap, classeur.classeurId, res);

}

exports.removeCardToClasseur = (req, res) => {
    let classeur = req.body.classeur;
    let cardId = req.body.cardId;
    if (!classeur || !cardId) {
        res.status(400).send({message: "Missing parameters"});
        return;
    }

    let cardMap = classeur.cardMap ? classeur.cardMap : [];
    cardMap = cardMap.filter((card) => card !== cardId);
    cardMap = JSON.stringify(cardMap);

    updateCardMapClasseur(cardMap, classeur.classeurId, res);

}


function updateCardMapClasseur(cardMap, classeurId, res) {
    const sql = "UPDATE classeur SET card_map = ? WHERE id = ?";
    db.query(
        sql,
        [cardMap, classeurId],
        (err, result) => {
            if (err) {
                res.status(500).send({message: "Error while adding card to classeur"});
                console.error(err);
            } else {
                res.status(200).send({message: "Classeur updated"});
            }
        }
    )
}

exports.deleteClasseur = (req, res) => {


    // const sql = "DELETE FROM card WHERE id = ?";
    // const cardId = req.params.cardId;

    // db.query(
    //     sql,
    //     cardId,
    //     (err, result) => {
    //         if (err) {
    //             res.status(500).send({message: "Error while deleting card"});
    //             console.error(err);
    //         } else {
    //             res.status(200).send({message: "Card deleted"});
    //         }
    //     }
    // )
}