import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, InputLabel } from "@mui/material";
import axios from '../../api/axios';
import './ClasseurView.scss';

function ClasseurView({classeur, cards, refreshClasseur}) {

    const [cardToAdd, setCardToAdd] = useState("");
    const [classeurCards, setClasseurCards] = useState([]);

    useEffect(() => {
        refreshClasseurCards();
    }, [classeur]);

    const handleChange = (e) => {
        setCardToAdd(e.target.value);
    }

    const refreshClasseurCards = () => {
        axios.post('/classeur-cards', {
            classeur: classeur
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response.data);
            setClasseurCards(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        if (!cardToAdd) {
            alert("Veuillez sélectionner une carte");
            return;
        }

        axios.post('/add-card-to-classeur', {
            classeur: classeur,
            cardId: cardToAdd
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response);
            alert("Carte ajoutée avec succès");
            refreshClasseur();
            refreshClasseurCards();
        }).catch((error) => {
            console.error(error);
            alert("Erreur lors de l'ajout de la carte");
        });
        console.log("Add card", cardToAdd);
    }

    const deleteCard = (card) => {
        axios.post('/remove-card-to-classeur', {
            classeur: classeur,
            cardId: card.cardId
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response);
            alert("Carte supprimée avec succès");
            refreshClasseur();
            refreshClasseurCards();
        }).catch((error) => {
            console.error(error);
            alert("Erreur lors de la suppression de la carte");
        });

    }
    
    return (
        <div>
            <div className="classeur-view-cards">
                {classeurCards && classeurCards.map((card, index) => (
                    <Card sx={{ minWidth: 275 }} key={index}>
                        <CardContent>
                            <h3>{card.cardId}</h3>
                            <button onClick={() => deleteCard(card)}>Delete card</button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <InputLabel id="new-card-id">Ajouter une carte</InputLabel>
                    <select id="cardToAdd" name="cardToAdd" required={true} onChange={handleChange} >
                        {cards.map((card, index) => (
                            <option value={card.id} key={index}>{card.id}</option>
                        ))}
                    </select>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleSubmitAdd}>Ajouter</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default ClasseurView;