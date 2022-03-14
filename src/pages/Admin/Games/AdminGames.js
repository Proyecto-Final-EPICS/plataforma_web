//Liberias
import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';

//Componentes
import GridGame from '../../../components/Admin/GridGame';
import GameFilters from '../../../components/Admin/GameFilters';

//API
import { getVideogamesApi } from '../../../api/admin';

//Estilo
import './AdminGames.scss'

export default function AdminGames() {
    const { Content, Header } = Layout;
    const [games, setGames] = useState([]);

    useEffect(() => {
        // getVideogamesApi().then(response => {
        //     setGames(response);
        // });
        initGames(setGames);
    }, []);
    
    return(
        <Layout className='admin-games'>
            <Header className='admin-games__header'>
                <GameFilters/>
            </Header>
            <Content className='admin-games__content'>
                <GridGame games={games}/>
            </Content>
        </Layout>
    );
}

function initGames(setGames) {
    setGames([
        {
            id: "1",
            shortname: "App1",
            image: "https://streamerranks.com/wp-content/uploads/2021/03/clipart-videogames.png",
            level: "A2",
            developers: ["Juan Torres",  "Diego Cabal", ],
        },
        {
            id: "2",
            shortname: "App2",
            image: "https://streamerranks.com/wp-content/uploads/2021/03/clipart-videogames.png",
            level: "A1",
            developers: ["Sara Escobar", ],
        },
        {
            id: "3",
            shortname: "App3",
            image: "https://streamerranks.com/wp-content/uploads/2021/03/clipart-videogames.png",
            level: "C2",
            developers: ["Spella"],
        },
        {
            id: "4",
            shortname: "App4",
            image: "https://streamerranks.com/wp-content/uploads/2021/03/clipart-videogames.png",
            level: "C2",
            developers: ["Karen Molinares"],
        },
        {
            id: "5",
            shortname: "App5",
            image: "https://streamerranks.com/wp-content/uploads/2021/03/clipart-videogames.png",
            level: "B1",
            developers: ["Manuel Arias", "Óscar Serrano"],
        },

    ]);
}
