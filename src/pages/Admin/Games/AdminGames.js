//Liberias
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import qs from 'query-string';

//Componentes
import GamesFilters from '../../../components/Admin/GamesFilters';
import ListGames from '../../../components/Admin/ListGames';

//API
import gamesApi from './../../../mock_data/collections/game.json';

//Estilo
import './AdminGames.scss'

export default function AdminGames() {
    const { Content, Header } = Layout;
    const [games, setGames] = useState([]);
    const query = qs.parse(window.location.search);

    const appGames = () => gamesApi.filter(g => g.appCode === query.app);

    useEffect(() => {
        setGames(appGames());
    }, []);
    
    return (
        <Layout className='admin-games'>
            <Header className='admin-games__header'>
                <GamesFilters/>
            </Header>
            <Content className='admin-games__content'>
                <ListGames games={games.map(g => (
                    {name: g.name}
                ))}/>
            </Content>
        </Layout>
    );
}
