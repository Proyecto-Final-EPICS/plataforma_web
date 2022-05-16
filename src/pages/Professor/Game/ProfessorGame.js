//Liberias
import { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import { Row, Col } from "antd";

import Game from '../../../components/Professor/Game';

//API
import gameApi from './../../../mock_data/collections/game.json';

import useAuth from '../../../hooks/useAuth';

//Estilo
import './ProfessorGame.scss'

export default function ProfessorGame() {
    const [game, setGame] = useState(null);
    const { school } = useAuth();

    const getGame = () => {
        const matchGame = matchPath(window.location.pathname, { path: '/games/:game' });
        return matchGame && matchGame.params.game;
    }
    
    useEffect(() => {
        const gameId = `${school}-${getGame()}`;
        setGame(gameApi.find(g => g.id == gameId));
    }, []);
    
    return (
        <>
        {game && <Game game={game}/>}
        </>
    );
}
