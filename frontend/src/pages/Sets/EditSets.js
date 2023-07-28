import React, { useEffect, useState } from "react";
import "./EditSets.scss";
import CreateSet from "./CreateSet";
import axios from "../../api/axios";
import { GetSetIllustration } from "../../components/Illustrations";

function EditSets() {

    const [sets, setSets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        axios.get('/sets')
            .then((response) => {
                console.log(response.data);
                let data = response.data;
                setSets(data);
                setIsLoading(false);
            }).catch((error) => {
                console.error(error);
            });
    }, [])

    const deleteSet = (setId) => {
        const shouldDelete = window.confirm("Voulez-vous vraiment supprimer ce set ?");
        if (shouldDelete) {
            console.log(setId);
            // Ici, vous pouvez exécuter le code pour supprimer le set avec l'ID donné
            axios.delete(`/delete-set/${setId}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                },
            }).then((response) => {
                console.log(response);
                setSets(sets.filter((set) => set.setId !== setId));
                alert("Set supprimé avec succès");
            }).catch((error) => {
                console.error(error);
                alert("Erreur lors de la suppression du set");
            });
        }
    };

    return (
        <div className="edit-sets">
            <h2>Gestion des sets</h2>
            <div>
                <div className="edit-sets__list">
                    <h3>Liste des sets</h3>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom</th>
                                    <th>Description</th>
                                    <th>Illustration</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sets.map((set) => (
                                    <tr key={set.setId}>
                                        <td>{set.setId}</td>
                                        <td>{set.setName}</td>
                                        <td>{set.setDesc}</td>
                                        <td>
                                            <GetSetIllustration setId={set.setId} />
                                        </td>
                                        <td>
                                            <button>Modifier</button>
                                            <button onClick={() => deleteSet(set.setId)}>Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="edit-sets__create">
                    <CreateSet />
                </div>
            </div>
        </div>
    );
}

export default EditSets;