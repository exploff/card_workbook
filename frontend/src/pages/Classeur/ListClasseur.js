function ListClasseur({classeurs, showClasseur}) {

    const onClickShow = (classeur) => {
        showClasseur(classeur);

    }

    return (
        <div>
            <h2>Liste des classeurs</h2>
            { classeurs && classeurs.map((classeur) => (
                <div key={classeur.classeurId} >
                    <h3>{classeur.classeurName}</h3>
                    <p>Créé le {classeur.classeurCreatedAt}</p>
                    <p>Nombre de carte : {classeur.cardMap.length}</p>
                    <button onClick={() => onClickShow(classeur)}>Voir</button>
                </div>
            ))}
        </div>
    );
}

export default ListClasseur;