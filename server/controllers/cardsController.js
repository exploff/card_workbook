const { dataToCard, cardToData } = require('../models/Card');
const db = require('../mysql/database');

exports.getCards = (req, res) => {
    const sql = "SELECT * FROM card";
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({message: "Error while getting cards"});
            console.error(err);
        } else {
            res.status(200).send(cardToData(result));
        }
    })
}

exports.getCardsField = (req, res) => {
    const field = req.params.field;
    const sql = "SELECT ?? FROM card";
    db.query(sql, field, (err, result) => {
        if (err) {
            res.status(500).send({message: "Error while getting cards"});
            console.error(err);
        } else {
            res.status(200).send(result);
        }
    })
}

exports.createCard = (req, res) => {

    const card = dataToCard(req.body);
    if (!card.id || !card.name || !card.description || !card.type || !card.rarity || !card.color || !card.illustration_type || !card.card_set_id) {
        res.status(400).send({message: "Missing parameters"});
        return;
    }

    const sql = "INSERT INTO card (id, name, description, type, rarity, color, card_trigger, power, life, cost, counter, attribute, illustration_type, card_set_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
        sql,
        [card.id, card.name, card.description, card.type, card.rarity, card.color, card.trigger, card.power, card.life, card.cost, card.counter, card.attribute, card.illustration_type, card.card_set_id],
        (err, result) => { 
            if (err) {
                res.status(500).send({message: "Error while creating card"});
                console.error(err);
            } else {
                res.status(200).send({message: "Card created"});
            }
        }
    )
}


exports.deleteCard = (req, res) => {
    const sql = "DELETE FROM card WHERE id = ?";
    const cardId = req.params.cardId;

    db.query(
        sql,
        cardId,
        (err, result) => {
            if (err) {
                res.status(500).send({message: "Error while deleting card"});
                console.error(err);
            } else {
                res.status(200).send({message: "Card deleted"});
            }
        }
    )
}