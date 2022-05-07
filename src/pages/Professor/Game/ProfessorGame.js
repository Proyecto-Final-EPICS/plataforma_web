//Liberias
import { useState, useEffect, useContext } from 'react';
import { matchPath } from 'react-router-dom';
import { Layout } from 'antd';

//API
import gameApi from './../../../mock_data/collections/game.json';

import ProfessorContext from '../../../components/Professor/ProfessorContext';

//Estilo
import './ProfessorGame.scss'

export default function ProfessorGame() {
    const { Content, Header } = Layout;
    const { userInfo } = useContext(ProfessorContext);
    const [game, setGame] = useState({});

    const getGame = () => {
        const matchGame = matchPath(window.location.pathname, { path: '/home/:course/game-store/:game' });
        return matchGame && matchGame.params.course;
    }

    useEffect(() => {
        const { school } = userInfo;
        if(!school) return;

        const gameCode = getGame();
        const id = `${school}-${gameCode}`;
        setGame(gameApi.find(g => g.id == id));
    }, []);
    
    return (
        <div>"asd"</div>
    );
}
