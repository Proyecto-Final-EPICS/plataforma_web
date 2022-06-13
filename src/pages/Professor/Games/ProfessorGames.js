//Liberias
import { useState, useEffect } from 'react';
import { Layout } from 'antd';

//Componentes
import GamesFilters from '../../../components/Professor/GamesFilters';
import ListGames  from '../../../components/Professor/ListGames';

//API
import { getSchool } from '../../../api/school';

import useAuth from '../../../hooks/useAuth';

//Estilo
import './ProfessorGames.scss'

export default function ProfessorGames() {
    const { Content, Header } = Layout;
    const [games, setGames] = useState([]);
    const { id_school } = useAuth();

    useEffect(() => {
        getSchool(id_school).then(json => setGames(json.games));
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
