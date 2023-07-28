function dataToCard(data) {
    return {
        id: data.cardId,
        name: data.cardName,
        description: data.cardDesc,
        type: data.cardType,
        rarity: data.cardRarity,
        color: data.cardColor,
        trigger: data.cardTrigger ? data.cardTrigger : "",
        power: data.cardPower ? data.cardPower : 0,
        life: data.cardLife ? data.cardLife : 0,
        cost: data.cardCost ? data.cardCost : 0,
        counter: data.cardCounter ? data.cardCounter : 0,
        attribute: data.cardAttribute ? data.cardAttribute : "",
        illustration_type: data.cardIllustrationType ? data.cardIllustrationType : "",
        card_set_id: data.cardSet,
    }
}

function cardToData(cards) {

    let data = [];

    cards.forEach((card) => {
        data.push({
            cardId: card.id,
            cardName: card.name,
            cardDesc: card.description,
            cardType: card.type,
            cardRarity: card.rarity,
            cardColor: card.color,
            cardTrigger: card.card_trigger ? card.card_trigger : "",
            cardPower: card.power ? card.power : 0,
            cardLife: card.life ? card.life : 0,
            cardCost: card.cost ? card.cost : 0,
            cardCounter: card.counter ? card.counter : 0,
            cardAttribute: card.attribute ? card.attribute : "",
            cardIllustrationType: card.illustration_type ? card.illustration_type : "",
            cardSet: card.card_set_id,
            cardCreatedAt: card.created_date,
            cardUpdatedAt: card.updated_date,
        })
    });

    return data;
}

module.exports = {
    dataToCard,
    cardToData
}
