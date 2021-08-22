//Librerias
import React,{useState,useEffect} from 'react';
import {Layout} from 'antd';
import {useParams} from 'react-router-dom';

//Componentes
import ListGames from '../../../components/Professor/Estudiantes/ListGames';

//Api
import {getGameByStudentApi} from '../../../api/colegio';

//Estilos
import './GamesStudent.scss';

export default function GamesStudent(){
    const {Content,Header} = Layout;
    const {username} = useParams();
    const [games,setGames] = useState([]);
    
    

    useEffect(() => {
        let isMounted = true;
        getGameByStudentApi(username)
        .then(response => {
          setGames(response)
        })
        return () =>{isMounted = false};
    },[])

    return(
        <Layout>
            <div className="col-je__titulo">
                Videojuegos jugados
            </div>
            
            <div className="je-contenido">

                <Header className="je-contenido__header">

                    <div className="je-contenido__header__col">
                        <h1>Nombre</h1>
                    </div>

                    <div className="je-contenido__header__col">
                        <h1>Acción</h1>
                    </div>
                </Header>

                <Content className="je-contenido__content"> 
                    <ListGames games={games} />
                </Content>
            </div>

        </Layout>
    );
}