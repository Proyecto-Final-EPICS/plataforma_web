//Liverias
import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Layout,Button} from 'antd';

//Componentes
import ListGames from '../../../components/Professor/ListGames';

//Api
import {getGamesByColegio} from '../../../api/colegio';

//Esitlos
import './Colegio_Games.scss';

export default function Colegio_Games(){
    const [juegos,setJuegos] = useState({});
    const {Content,Header} = Layout;
    const {colegio} = useParams();
    
    useEffect(()=>{
        getGamesByColegio(colegio).then(response =>{
            setJuegos(response);
        })
    },[])

    return(
        <Layout>

            <div className="juego-top">
                <div className="juego-top__titulo">
                   Juegos del colegio {colegio}
                </div>
            </div>
        
            
            <div className="juego-contenido">

                <Header className="juego-contenido__header">

                    <div className="juego-contenido__header__col">
                        <h1>Nombre</h1>
                    </div>

                    <div className="juego-contenido__header__col">
                        <h1>Tema</h1>
                    </div>    

                    <div className="juego-contenido__header__col">
                        <h1>Detalles</h1>
                    </div>

                    <div className="juego-contenido__header__col">
                        <h1>Ranking</h1>
                    </div>
                </Header>

                <Content className="juego-contenido__content"> 
                    <ListGames juegos={juegos}/>
                </Content>
            </div>
        </Layout>
    );
}