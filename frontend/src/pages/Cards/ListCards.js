import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Modal, Pagination, Stack } from "@mui/material";
import Card from "../../components/Card";

function ListCards() {
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const [open, setOpen] = useState(false);
    const [card, setCard] = useState({});// Carte à afficher dans le modal
    const [numberPage, setNumberPage] = useState(1);// Nombre de page de la pagination
    const [page, setPage] = useState(1);// Page courante de la pagination
    const [cardsPerPage, setCardsPerPage] = useState([]);// Tableau des cards à afficher sur la page courante
    const numberCardPerPage = 2;// Nombre de card par page

    useEffect(() => {
        axios.get('/cards',
            {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            })
            .then((response) => {
                console.log(response.data);
                let data = response.data;
                setCards(data);
                setIsLoading(false);
                setNumberPage(Math.ceil(data.length / numberCardPerPage));
                setCardsPerPage(data.slice(0, numberCardPerPage));
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const deleteCard = (cardId) => {
        const shouldDelete = window.confirm("Voulez-vous vraiment supprimer cette carte ?");
        if (shouldDelete) {
            console.log(cardId);
            axios.delete(`/delete-card/${cardId}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                },
            }).then((response) => {
                console.log(response);
                setCards(cards.filter((card) => card.cardId !== cardId));
                alert("Card supprimé avec succès");
            }).catch((error) => {
                console.error(error);
                alert("Erreur lors de la suppression de la card");
            });
        }
    };

    const handleClose = () => setOpen(false);

    const handleView = (card) => {
        console.log(card);
        setOpen(true);
        setCard(card);
    }
    //Pagination avec material ui
    const handlePageChange = (event, value) => {
        setPage(value);
        setCardsPerPage(cards.slice((value - 1) * numberCardPerPage, value * numberCardPerPage));


    };

    return (


        <div className="edit-cards__list">
            <h3>Liste des cards</h3>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Couleur</th>
                                <th>Set</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cardsPerPage.map((card) => (
                                <tr key={card.cardId}>
                                    <td>
                                        <button onClick={() => handleView(card)}>Voir</button>
                                    </td>
                                    <td>{card.cardId}</td>
                                    <td>{card.cardName}</td>
                                    <td>{card.cardColor}</td>
                                    <td>{card.cardSet}</td>

                                    <td>
                                        <button>Modifier</button>
                                        <button onClick={() => deleteCard(card.cardId)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Stack spacing={2}>
                        <Pagination count={numberPage} page={page} variant="outlined" onChange={handlePageChange} />
                    </Stack>
                </>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card card={card} />
            </Modal>
        </div>
    );
}

export default ListCards;