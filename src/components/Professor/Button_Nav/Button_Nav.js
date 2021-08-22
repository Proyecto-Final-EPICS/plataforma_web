//Liberias
import React from 'react';
import { Link } from 'react-router-dom';

//Iconos
import colegioIcon from '../../../assets/icons/school.png';

//Estilos
import './Button_Nav.scss';

export default function Button_Nav(){
    return(
        <div className="button-nav">
            <Link to= {"/home/colegios"}>
                <div className="button-nav__icon" >
                    <img src = {colegioIcon} alt="boton_colegios" />
                </div>

                <div className="button-nav__texto">
                    <span>
                        Colegios
                    </span>
                </div>
               
            </Link>
        </div>
    );
}