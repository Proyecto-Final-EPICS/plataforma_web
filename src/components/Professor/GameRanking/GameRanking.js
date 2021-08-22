//Liberias
import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {Table} from 'antd';

//Api
import {getRankingGameBySchool} from '../../../api/colegio';

//Estilos
import './GameRanking.scss';

export default function GameRanking(props){
    const {juego,reload} = props;
    const {colegio} = useParams();
    const [data,setData] = useState([]);
    const columns = [
        {
            title: 'Usuario',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Nivel',
            dataIndex: 'level',
            key: 'level'
        },
        {
            title: 'Puntaje',
            dataIndex: 'score',
            key: 'score'
        }
    ]
    
    const ordenarData = (data) =>{
        let dataSource = [];
        dataSource = info(data).sort((a,b) =>{
            if(a.score > b.score){
                return -1;
            }
            if(a.score < b.score){
                return 1;
            }
            return 0;
        });
        return dataSource;
    }

    const info = (data) =>{
        const aux = []
        let preData = []
        data.forEach((dato,index) =>{
            const pd = {
                key: index,
                username:"",
                level:"",
                score:""
            }
            pd.username = dato.username;
            pd.level = dato.lastlevel;
            pd.score = dato.score;
            aux.push(pd);
        })
       preData = aux.sort((a,b) =>{
           if(a.level > b.level){
               return -1;
           }
           if(a.level < b.level){
               return 1;
           }
           return 0;
       })
       return preData;
    }

    useEffect(()=>{
        getRankingGameBySchool(juego,colegio).then(response =>{
            setData(response);
        })
    },[reload])

    return(
        <div> 
          <Table columns={columns} dataSource={ordenarData(data)}   className="tabla"/>
        </div>
    );
}