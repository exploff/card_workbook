import React from 'react';
import './EditCards.scss';
import CreateCard from './CreateCard';

function EditCards() {
    //TODO : l'affichage des cartes créer en tableau, avec action delete
    return ( 
        <div className='edit-cards'>
            <h2>Gestion des cartes</h2>
            
            <div className='edit-cards__create'>
                <CreateCard />
            </div>
        </div>
     );
}

export default EditCards;