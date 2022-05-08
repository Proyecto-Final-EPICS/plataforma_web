//Liberias
import { useState, useEffect, useContext } from 'react';
import { matchPath } from 'react-router-dom';
import { Layout } from 'antd';
// import qs from 'query-string';

//Componentes
import GamesFilters from '../../../components/Professor/GamesFilters';
import GameStore  from '../../../components/Professor/GameStore';

//API
import gameApi from './../../../mock_data/collections/game.json';

import ProfessorContext from '../../../components/Professor/ProfessorContext';

//Estilo
import './ProfessorGames.scss'

export default function ProfessorGames() {
    const { Content, Header } = Layout;
    const { userInfo } = useContext(ProfessorContext);
    const [games, setGames] = useState([]);

    useEffect(() => {
        const { school } = userInfo;
        if(!school) return;

        setGames(gameApi.filter(g => g.school == school));
    }, [userInfo]);
    
    return (
        <Layout className='professor-games'>
            <Header className='professor-games__header'>
                <GamesFilters/>
            </Header>
            <Content className='professor-games__content'>
                <GameStore games={games}/>
            </Content>
        </Layout>
    );
}
