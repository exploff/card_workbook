
export const GetSetIllustrations = ({setId}) => {

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