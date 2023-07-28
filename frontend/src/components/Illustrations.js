
export const GetSetIllustration = ({setId}) => {

    let imagePath = null;

    try {
        imagePath = require(`../assets/images/illustrations_set/${setId}.jpg`);
    } catch (err) {
        imagePath = require(`../assets/images/default.png`);
    }

    return (
        <img
            src={imagePath}
            alt={`Illustration for Set ${setId}`}
        />
    );

}

export const GetCardIllustration = ({cardId, setId, cardIllustrationType}) => {
    let illustrationType = "";
    if (cardIllustrationType === "special") {
        illustrationType = "_p1";
    } else if(cardIllustrationType === "alternate") {
        illustrationType = "_p2";
    }
    
    let imagePath = null;
    try {
        imagePath = require(`../assets/images/${setId}/${cardId + illustrationType}.png`);
    } catch (err) {
        imagePath = require(`../assets/images/default.png`);
    }

    return (
        <img
            src={imagePath}
            alt={`Illustration for Card ${cardId}`}
        />
    )
}