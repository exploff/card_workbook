import React, { useEffect, useState } from 'react';
import { CardColor, CardIllustrationType, CardRarity, CardType } from '../../constants/CardConstants';
import axios from '../../api/axios';
import { CardModel } from '../../models/CardModel';

function CreateCard() {
    const [isLoading, setIsLoading] = useState(true);
    const [set, setSets] = useState([]);
    const [card, setCard] = useState(new CardModel(CardType[0].value, CardRarity[0].value, CardColor[0].value, CardIllustrationType[0].value));

    useEffect(() => {
        axios.get('/sets')
            .then((response) => {
                let data = response.data;
                setSets(data);
                setIsLoading(false);
            }).catch((error) => {
                console.error(error);
            });

        console.log(card)

    }, [card])

    const handleFieldChange = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value });
        console.log(card)
    }

    const handleSubmit = (e) => {
        console.log(card)

        e.preventDefault(); // Empêche le rechargement de la page
        if (!card.cardId || !card.cardName || !card.cardDesc || !card.cardType || !card.cardRarity || !card.cardColor || !card.cardIllustrationType || !card.cardSet) {
            alert("Veuillez remplir tous les champs obligatoires");
            return;
        }

        axios.post('/create-card', card, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response);
            alert("Carte créée avec succès")
            window.location.reload();
        }).catch((error) => {
            console.error(error);
            alert("Erreur lors de la création de la carte")
        });
    }

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h3>Créer une carte</h3>
                    <div>
                        <label htmlFor="cardId">ID</label>
                        <input type="text" id="cardId" name="cardId" placeholder='ID de la carte' required={true} 
                            onChange={handleFieldChange}/>
                    </div>
                    <div>
                        <label htmlFor="cardName">Nom</label>
                        <input type="text" id="cardName" name="cardName" placeholder='Nom de la carte' required={true} 
                            onChange={handleFieldChange}/>
                    </div>
                    <div>
                        <label htmlFor="cardDesc">Description</label>
                        <textarea id="cardDesc" name="cardDesc" rows={4} placeholder='Description de la carte' required={true} 
                            onChange={handleFieldChange}/>
                    </div>
                    <div>
                        <label htmlFor="cardType">Type</label>
                        <select id="cardType" name="cardType" required={true} onChange={handleFieldChange}>
                            {CardType.map((type, index) => (
                                <option value={type.value} key={index}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cardRarity">Rareté</label>
                        <select id="cardRarity" name="cardRarity" required={true} onChange={handleFieldChange}>
                            {CardRarity.map((rarity, index) => (
                                <option value={rarity.value} key={index}>{rarity.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cardColor">Couleur</label>
                        <select id="cardColor" name="cardColor" required={true} onChange={handleFieldChange}>
                            {CardColor.map((color, index) => (
                                <option value={color.value} key={index}>{color.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cardTrigger">Déclencheur</label>
                        <input type="text" id="cardTrigger" name="cardTrigger" placeholder='Effet déclencheur de la carte' 
                            onChange={handleFieldChange}/>
                    </div>
                    <div>
                        <label htmlFor="cardPower">Puissance</label>
                        <input type="number" id="cardPower" name="cardPower" placeholder='Puissance de la carte' 
                            onChange={handleFieldChange}/>
                    </div>
                    <div>
                        <label htmlFor="cardLife">Vie</label>
                        <input type="number" id="cardLife" name="cardLife" placeholder='Vie' 
                            onChange={handleFieldChange}/>
                    </div>
                    <div>
                        <label htmlFor="cardCost">Coût</label>
                        <input type="number" id="cardCost" name="cardCost" placeholder='Coût de la carte' 
                            onChange={handleFieldChange}/>
                    </div>
                    <div>
                        <label htmlFor="cardCounter">Contre</label>
                        <input type="text" id="cardCounter" name="cardCounter" placeholder='Contre de la carte' 
                            onChange={handleFieldChange}/>
                    </div>
                    <div>
                        <label htmlFor="cardAttribute">Attribut</label>
                        <input type="text" id="cardAttribute" name="cardAttribute" placeholder='Attribut de la carte' 
                            onChange={handleFieldChange}/>
                    </div>
                    <div>
                        <label htmlFor="cardIllustrationType">Illustration type</label>
                        <select id="cardIllustrationType" name="cardIllustrationType" required={true} onChange={handleFieldChange}>
                            {CardIllustrationType.map((illustrationType, index) => (
                                <option value={illustrationType.value} key={index}>{illustrationType.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cardSet">Set</label>
                        <select id="cardSet" name="cardSet" required={true} onChange={handleFieldChange}>
                            <option value="">Sélectionnez un set</option>
                            {set.map((set, index) => (
                                <option value={set.setId} key={index}>{set.setName}</option>
                            ))}
                        </select>
                    </div>
                    <button>Enregistrer</button>
                </form>
            )}
        </>
    );
}

export default CreateCard;