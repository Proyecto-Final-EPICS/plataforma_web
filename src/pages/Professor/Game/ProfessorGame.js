//Liberias
import { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';

import Game from '../../../components/Professor/Game';

//API
import { getGameFromSchool } from '../../../api/game';

import useAuth from '../../../hooks/useAuth';

//Estilo
import './ProfessorGame.scss'

export default function ProfessorGame() {
    const [game, setGame] = useState(null);
    const { id_school } = useAuth();

    const getGame = () => {
        const matchGame = matchPath(window.location.pathname, { path: '/games/:game' });
        return matchGame && matchGame.params.game;
    }
    
    useEffect(() => {
        getGameFromSchool(id_school, getGame()).then(json => setGame(json));
    }, []);
    
    return game && <Game game={game}/>;
}
