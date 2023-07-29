import React, {useState} from 'react';
import { TextField } from '@mui/material';
import axios from '../../api/axios';

function CreateClasseur() {
    const [errorName, setErrorName] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        if (name === "") {
            setErrorName(true);
            return;
        } else {
            setErrorName(false);
        }

        axios.post('/create-classeur', {
            classeurName: name
        }, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response);
            alert("Classeur créé avec succès");
            window.location.reload();
        }).catch((error) => {
            console.error(error);
            alert("Erreur lors de la création du classeur");
        });

        console.log(name);
    }

    return (
        <div>
            <h2>Créer un classeur</h2>
            <form onSubmit={handleSubmit}>
                <TextField id="name" label="Nom" variant="outlined" error={errorName} helperText="Veuillez entrer un nom" />
                <button type="submit">Créer</button>
            </form>
        </div>
    )
}

export default CreateClasseur;