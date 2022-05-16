//Liberias
import { useState, useEffect } from 'react';
import { Layout } from 'antd';

//Componentes
import GamesFilters from '../../../components/Professor/GamesFilters';
import ListGames  from '../../../components/Professor/ListGames';

//API
import gameApi from './../../../mock_data/collections/game.json';

import useAuth from '../../../hooks/useAuth';

//Estilo
import './ProfessorGames.scss'

export default function ProfessorGames() {
    const { Content, Header } = Layout;
    const [games, setGames] = useState([]);
    const { school } = useAuth();

    useEffect(() => {
        setGames(gameApi.filter(g => g.school == school));
    }, []);
    
    return (
        <Layout className='professor-games'>
            <Header className='professor-games__header'>
                <GamesFilters/>
            </Header>
            <Content className='professor-games__content'>
                <ListGames games={games}/>
            </Content>
        </Layout>
    );
}
