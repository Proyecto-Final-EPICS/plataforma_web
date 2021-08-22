//Liberias
import React from 'react';
import {List,Button,Card} from 'antd';
import {CaretUpOutlined} from '@ant-design/icons';
import {Link,useParams} from 'react-router-dom';

//Estilos
import './ListGames.scss';

export default function ListGames(props){
    const {games} = props;
    // games.shift();
    return(
        <div className="list-games">
            <Juegos games={games}/>
        </div>
    );
}

function Juegos(props){
    const {games} = props;
    return(
        
        <List
            grid={{gutter: 16, column: 1}}
            className= "games"
            itemLayout= "horizontal"
            dataSource={games}
            renderItem={game => <Juego
                game = {game}
            />}
        />
    );
}

function Juego(props){
    const {game} = props;
    const {colegio,estudiante,username} = useParams();

    

    return(
        <Card className="card">
            <List.Item
                actions={[
                    <div className="card__content-game">
                        <h1 className="card__content__title">
                            {game}
                        </h1>
        
                        <Link to ={`/home/colegios/${colegio}/estudiantes/${estudiante}-${username}/${game}`}>
                            <Button type="primary" className="card__button" > 
                                Entrar
                                <CaretUpOutlined />
                            </Button> 
                        </Link>
                    </div>
                    
                ]}
            >
                {/* <div className="card__content">
                    <List.Item.Meta
                        title={`
                            ${colegio.schoolName}
                        `}
                    />
                </div> */}
            </List.Item>
        </Card>
        
    );
}