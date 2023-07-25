import React, { useState } from "react";
import "./CreateSet.scss";
import axios from "../../api/axios";
function CreateSet() {

    const [dataCard, setDataCard] = useState({}); // Tableau des données des cartes

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        if (!dataCard.setId || !dataCard.setName || !dataCard.setDesc) {
            alert("Veuillez remplir tous les champs obligatoires");
            return;
        }

        console.log(dataCard)

        axios.post('/create-set', dataCard, {  
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response);
            alert("Set créé avec succès")
            window.location.reload();
        }).catch((error) => {
            console.error(error);
            alert("Erreur lors de la création du set")
        });
        
    }

    const handleFieldChange = (e) => {
        setDataCard({ ...dataCard, [e.target.name]: e.target.value });
    }

    return (
        <form className="form-create-set" onSubmit={handleSubmit}>
            <h3>Créer un set</h3>
            <div>
                <label htmlFor="setId">ID</label>
                <input type="text" id="setId" name="setId" placeholder='ID du set' required={true} 
                    onChange={handleFieldChange}/>
            </div>
            <div>
                <label htmlFor="setName">Nom</label>
                <input type="text" id="setName" name="setName" placeholder='Nom du set' required={true} 
                    onChange={handleFieldChange} />
            </div>
            <div>
                <label htmlFor="setDesc">Description</label>
                <textarea id="setDesc" name="setDesc" rows={4} placeholder='Description du set' required={true} 
                    onChange={handleFieldChange} />
            </div>
            <div>
                <label htmlFor="setIllustration">Illustration</label>
                <input type="text" id="setIllustration" name="setIllustration" placeholder='Illustration du set' 
                    onChange={handleFieldChange} />
            </div>
            <button>Enregistrer</button>
        </form>
    ); 
}

export default CreateSet;