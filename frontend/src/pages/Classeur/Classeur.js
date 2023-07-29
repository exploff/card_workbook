import React, {useState, useEffect} from 'react';
import './Classeur.scss';
import ListClasseur from './ListClasseur';
import CreateClasseur from './CreateClasseur';
import axios from '../../api/axios';
import ClasseurView from './ClasseurView';

function Classeur() {
    const [classeurs, setClasseurs] = useState([]);
    const [classeurView, setClasseurView] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        //Get userid from localstorage
        axios.get('/classeurs',{
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response.data);
            setClasseurs(response.data);
        }).catch((error) => {
            console.error(error);
        });

        axios.get('/cards/id', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response.data);
            setCards(response.data);
        }).catch((error) => {
            console.error(error);
        }); 
    }, []);

    const showClasseur = (classeur) => {
        console.log("show classeur", classeur);
        setClasseurView(classeur);
    }

    const refreshClasseur = () => {
        axios.get('/classeurs',{
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response.data);
            setClasseurs(response.data);
            let newClasseurView = response.data.find((classeur) => classeur.classeurId === classeurView.classeurId);
            setClasseurView(newClasseurView);
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="classeur">
            <h2>Classeur</h2>
            <div>
                <ListClasseur classeurs={classeurs} showClasseur={showClasseur} />
            </div>
            <div className="classeur__create">
                <CreateClasseur />
            </div>
            <div className="classuer__view">
                { classeurView.classeurId && (
                    <ClasseurView classeur={classeurView} cards={cards} refreshClasseur={refreshClasseur} />
                )}
            </div>
        </div>
    );
}

export default Classeur;