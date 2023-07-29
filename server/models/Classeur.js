
function dataToClasseur(data) {
    let cardMap = data.cardMap ? data.cardMap : [];
    cardMap = JSON.stringify(cardMap);

    return {
        name: data.classeurName,
        user_id: data.userId,
        card_map: cardMap
    }
}


function classeurToData(classeurs) {
    let data = [];

    classeurs.forEach((classeur) => {
        let cardMap = classeur.card_map ? JSON.parse(classeur.card_map) : [];

        data.push({
            classeurId: classeur.id,
            classeurName: classeur.name,
            userId: classeur.user_id,
            cardMap: cardMap,
            classeurCreatedAt: classeur.created_date,
            classeurUpdatedAt: classeur.updated_date,
        })
    });

    return data;
}

module.exports = {
    dataToClasseur,
    classeurToData
}
