const { dataToCard } = require('../models/Card');
const db = require('../mysql/database');

exports.getCards = (req, res) => {
    res.status(500).send({message: "Not implemented"});        
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
