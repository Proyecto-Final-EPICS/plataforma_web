import React,{useState,useEffect} from 'react';

//Componentes

//Funciones
import {prueba} from '../../../api/users';

//stilos
import './AdminHome.scss'

export default function AdminHome(){

    const [variable, funcion] = useState([]);  

    return(
        <div className="Home">
            <h1>Bienvenido a la interfaz del administrador</h1>
        </div>
    );
}


