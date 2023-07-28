import { GetCardIllustration } from "./Illustrations";
import { Box, Typography } from '@mui/material';
import "./Card.scss"

function Card({ card }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Box sx={style} className="card">

            <div className="card-illustration">
                <GetCardIllustration cardId={card.cardId} cardIllustrationType={card.cardIllustrationType} setId={card.cardSet} />
            </div>
            <div className="card-body">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {card.cardId}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h3">
                    {card.cardName}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="card-body-description">
                        <p>{card.cardDesc}</p>
                        <p className="capitalize">{card.cardType}</p>
                        <p>{card.cardRarity}</p>
                        <p>{card.cardColor}</p>
                        <div className="card-grid-3-2">
                            {card.cardTrigger ? <p><span className="bold">Déclencheur</span> {card.cardTrigger}</p> : null}
                            {card.cardPower ? <p><span className="bold">Puissance</span> {card.cardPower}</p> : null}
                            {card.cardLife ? <p><span className="bold">Vie</span> {card.cardLife}</p> : null}
                            {card.cardCost ? <p><span className="bold">Coût</span> {card.cardCost}</p> : null}
                            {card.cardCounter ? <p><span className="bold">Contre</span> {card.cardCounter}</p> : null}
                            {card.cardAttribute ? <p><span className="bold">Attribut</span> {card.cardAttribute}</p> : null}
                        </div>
                        <p>{card.cardIllustrationType}</p>
                        <p>{card.cardSet}</p>
                    </div>


                </Typography>
            </div>
        </Box>
    );
}

export default Card;