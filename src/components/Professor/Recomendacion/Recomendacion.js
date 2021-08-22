//Libreria
import React,{useState,useEffect} from 'react';

//APi
import {getLastSession} from '../../../api/colegio';

//Assets
import Excelente from '../../../assets/icons/feliz.png'
import Sobresaliente from '../../../assets/icons/feliz2.png'
import Medio from '../../../assets/icons/triste.png'
import Bajo from '../../../assets/icons/triste2.png'

//Estilos
import './Recomendacion.scss';

export default function Recomendacion(props){
    const {game,estudiante,username} = props;
    const [sesion,setSesion] = useState({});
    
    useEffect(()=>{
        getLastSession(game,username).then(response =>{
            setSesion(response)
        })
    },[])

    function Consejo(){
        if(sesion.score < 100){
            return(
                <div className="consejo">
                    <div className="consejo__contenido">
                        <span key="1">
                             El estudiante debe estudiar nuavemente ordenamiento númerico,ascendente y descendente.
                        </span>
                    </div>
                    <div className="consejo__icono">
                        <img src={Bajo}/>
                    </div>
                </div>
            );
        }else if(sesion.score >= 100 && sesion.score < 200 ){
            return(
                <div className="consejo">
                    <div className="consejo__contenido">
                        <span key="2">
                            El estudiante debe repasar el tema.
                        </span>
                    </div>
                    <div className="consejo__icono">
                        <img src={Medio}/>
                    </div>
                </div>
            );
        }else if(sesion.score >= 200 && sesion.score < 300){
            return(
                <div className="consejo">
                    <div className="consejo__contenido">
                        <span key="3">
                            El estudiante está bien en el tema, sin embargo es importante reforzarlo.
                        </span>
                    </div>
                    <div className="consejo__icono">
                        <img src={Sobresaliente}/>
                    </div>
                </div>
            );
        }else if(sesion.score >=300){
            return(
                <div className="consejo">
                    <div className="consejo__contenido">
                        <span key="4">
                            El estudiante demuestra dominio en el tema. Se debe tratar de poner nuevos retos para que avance aún más en la temática
                        </span>
                    </div>
                    
                    <div className="consejo__icono">
                        <img src={Excelente}/>
                    </div>
                    
                </div>
            );
        }

        return null;
    }

    return(
       <div className="contenedor">
           <div className="contenedor__titulo">
                <h1>
                    Recomendaciones para {estudiante}
                </h1>
           </div>
           
           <div className="contenedor__contenido">    
               <Consejo/>
           </div>   
       </div>
    );
}