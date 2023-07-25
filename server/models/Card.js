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

function cardToData() {

}

module.exports = {
    dataToCard,
    cardToData
}
