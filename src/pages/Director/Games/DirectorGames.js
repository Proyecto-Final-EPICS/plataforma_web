//Liberias
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import qs from 'query-string';

//Componentes
import GamesFilters from '../../../components/Director/GamesFilters';
import ListGames from '../../../components/Director/ListGames';

//API
import gamesApi from './../../../mock_data/collections/game.json';

//Estilo
import './DirectorGames.scss'

export default function DirectorGames() {
    const { Content, Header } = Layout;
    const [games, setGames] = useState([]);
    const query = qs.parse(window.location.search);

    const appGames = () => gamesApi.filter(g => g.appCode === query.app);

    useEffect(() => {
        setGames(appGames());
    }, []);
    
    return (
        <Layout className='director-games'>
            <Header className='director-games__header'>
                <GamesFilters/>
            </Header>
            <Content className='director-games__content'>
                <ListGames games={games}/>
            </Content>
        </Layout>
    );
}
