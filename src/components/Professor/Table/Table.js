//Liberías
import React,{useEffect,useState} from 'react';
import {Table as Tb} from 'antd';

//Estilos
import './Table.scss';

export default function Table(props){
    const {data} = props;
    const datos = [
        {
            key:'1',
            name: 'Diego',
            age:21
        }
    ]
    const columns = [
        {
            title:'Nombre',
            dataIndex:'name',
            key:'name'
        },
        {
            title:'Edad',
            dataIndex:'age',
            key:'age'
        }
    ]
    console.log("Este es la data",data);
    return(
        <Tb dataSource={datos} columns={columns}></Tb>
    );
}
//Columnas para tabla: inicio-final-nombre_est-nombre_juego