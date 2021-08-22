//Liberias
import React from 'react';
import {List,Button,Card} from 'antd';
import {CaretUpOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import './ListGames.scss'

export default function ListGames(props){
    const {games} = props;
    return(
        <div className="list-videojuegos">
            <Videogames games={games}/>
        </div>
    );
}

function Videogames(props){
    const {games} = props;
    return(
        
        <List
            grid={{gutter: 16, column: 1}}
            className= "videojuegos"
            itemLayout= "horizontal"
            dataSource={games}
            renderItem={game => <Videogame
                game = {game}
            />}
        />
    );
}

function Videogame(props){
    const {game} = props;
    // console.log(colegio);
    return(
        <Card className="card-admin">
            <List.Item
                actions={[
                    <div className="card-admin__content">
                        <h1 className="card-admin__content__title">
                            {game.gameName}
                        </h1>

                        <Link to ={`/home/colegios/${game.gameName}`}>
                            <Button type="primary" className="card-admin__button"> 
                                Entrar
                                <CaretUpOutlined />
                            </Button> 
                        </Link>
                    </div>
                    
                ]}
                
               
            >
            </List.Item>
        </Card>
        
    );
}