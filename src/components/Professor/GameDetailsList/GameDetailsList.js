//Liberias
import React,{useState,useEffect} from 'react';
import {Card} from 'antd';


//Api
import {getObjectivesByGameApi} from '../../../api/colegio';

//Estilos 
import './GameDetailsList.scss';

export default function GameDetailsList(props){
    const [objetivos,setObjetivos] = useState([]);
    const {juego,reload} = props;


    useEffect(()=>{
        getObjectivesByGameApi(juego.name).then(response =>{
            console.log(response);
            setObjetivos(response);
        })
    },[reload])

   

    const renderCards = objetivos.map(objetivo =>{
        return (<Card key={objetivo}> {objetivo}</Card>)
    });

    return(
        <div>
            {renderCards}
        </div>
    );
}