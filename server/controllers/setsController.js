const { dataToCardSet, cardSetToData } = require('../models/CardSet');
const db = require('../mysql/database');

exports.getSets = (req, res) => {
    const sql = "SELECT * FROM card_set";

    db.query(
        sql,
        (err, result) => {
            if (err) {
                res.status(500).send({message: "Error while fetching sets"});
                console.error(err);
            } else {
                res.status(200).send(cardSetToData(result));
            }
        }
    );
}

exports.createSet = (req, res) => {

    const cardSet = dataToCardSet(req.body);
    console.log(cardSet)

    if (!cardSet.id || !cardSet.name || !cardSet.description) {
        res.status(400).send({message: "Missing required fields"});
    } else {
        const sql = "INSERT INTO card_set (id, name, description, illustration_path) VALUES (?, ?, ?, ?)";
        
        db.query(
            sql,
            [cardSet.id, cardSet.name, cardSet.description, cardSet.illustration_path],
            (err, result) => {
                if (err) {
                    res.status(500).send({message: "Error while creating set"});
                    console.error(err);
                } else {
                    res.status(200).send({message: "Set created"});
                }
            }
        )
    }
}

exports.deleteSet = (req, res) => {
    const sql = "DELETE FROM card_set WHERE id = ?";
    const setId = req.params.setId;

    db.query(
        sql,
        setId,
        (err, result) => {
            if (err) {
                res.status(500).send({message: "Error while deleting set"});
                console.error(err);
            } else {
                res.status(200).send({message: "Set deleted"});
            }
        }
    )
}