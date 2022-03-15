//Liberias
import {Link} from 'react-router-dom';

// Componentes
import {List,Button,Card} from 'antd';
import {CaretUpOutlined} from '@ant-design/icons';

// Estilos
import './ListGames.scss'

export default function ListGames(props){
    const {games} = props;

    return(
        <div className="list-games">
            <List
                grid={{gutter: 16, column: 1}}
                className= "games"
                itemLayout= "horizontal"
                dataSource={games}
                renderItem={
                    game => <Game game={game}/>
                }
            />
        </div>
    );
}

function Game(props){
    const {game} = props;
    
    return(
        <Card className="card-admin">
            <List.Item
                actions={[
                    <div className="card-admin__content">
                        <h1 className="card-admin__content__title">
                            {game.name}
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
