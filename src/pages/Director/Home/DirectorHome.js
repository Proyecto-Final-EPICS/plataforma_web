import React,{useState,useEffect} from 'react';

//Componentes

//Funciones
import {prueba} from '../../../api/users';

//stilos
import './DirectorHome.scss'

export default function DirectorHome(){

    const [variable, funcion] = useState([]);  

    return(
        <div className="Home">
            <h1>Bienvenido a la interfaz de director</h1>
        </div>
    );
}


