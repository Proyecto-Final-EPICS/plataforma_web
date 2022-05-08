//Liberias
import { useState, useEffect, useContext } from 'react';
import { matchPath } from 'react-router-dom';
import { Row, Col, Button, message } from 'antd';

import GameModules from '../../../components/Professor/GameModules/GameModules';

//API
import courseApi from './../../../mock_data/collections/course.json';
import gameApi from './../../../mock_data/collections/game.json';

import ProfessorContext from '../../../components/Professor/ProfessorContext';

//Estilo
import './ProfessorGame.scss'

export default function ProfessorGame() {
    const { userInfo } = useContext(ProfessorContext);
    const [game, setGame] = useState(null);
    const [gameAdded, setGameAdded] = useState(false);

    const getGame = () => {
        const matchGame = matchPath(window.location.pathname, { path: '/games/:game' });
        return matchGame && matchGame.params.game;
    }
    
    const toggleGame = () => {
        const done = !gameAdded;
        setGameAdded(done);
        message.success(done ? 'Juego añadido con éxito!' : 'Juego retirado con éxito!');
    }

    useEffect(() => {
        const { school } = userInfo;
        if(!school) return;

        const gameId = `${school}-${getGame()}`;
        setGame(gameApi.find(g => g.id == gameId));
        // setGameAdded(courseApi.find(c => c.id == courseId).games.some(g => g.id == gameId));
    }, [userInfo]);
    
    return (
        <>
        {game &&
        <div className='professor-game'>
            <Row gutter={32}>
                <Col span={14}>
                    <div className='professor-game__summ'>
                        <div className='professor-game__summ__logo'>
                            <img
                                src={game.logo}
                                alt={`Logo de ${game.name}`}
                                width={300}
                            />
                        </div>
                        <div className='professor-game__summ__info'>
                            <div className='professor-game__h1'>{game.name}</div>

                            <div className='professor-game__summ__info__devs'>
                                <div className='professor-game__h2'>
                                    <b>Por: </b>
                                    {game.devs.map(d => (
                                        d.type == 'student' ? `${d.firstname} ${d.lastname}`: d.name
                                    )).join(', ')}
                                </div>
                            </div>
                            <div className='professor-game__summ__info__det'>
                                <div className='professor-game__h2'>
                                    <b>Código: </b>{game.code}
                                </div>
                                <div className='professor-game__h2'>
                                    <b>Tópicos: </b>{game.topics.join(', ')}
                                </div>
                                <div className='professor-game__h2'>
                                    <b>Nivel: </b>{game.level}
                                </div>
                                <div className='professor-game__h2'>
                                    <b>Skills: </b>{game.skills.join(', ')}
                                </div>
                            </div>

                            <div className='professor-game__add-course'>
                                <Button 
                                    type='primary'
                                    onClick={toggleGame}
                                >
                                    {gameAdded ? 'Retirar del curso' : 'Añadir al curso'}
                                </Button>
                            </div>

                        </div>
                    </div>
                </Col>
                <Col span={10}>
                    <div classame='professor-game__mod'>
                        <GameModules modules={game.modules} />
                    </div>
                </Col>
            </Row>
            <div className='professor-game__desc'>
                <div>
                    <h1 className='professor-game__desc__title'>Descripción</h1>
                    <p className='professor-game__desc__text'>{game.description}</p>
                </div>
            </div>
        </div>
        }
        </>
    );
}
