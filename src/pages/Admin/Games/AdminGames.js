//Liberias
import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';

//Componentes
import TableGame from '../../../components/Admin/TableGame';

//API
import { getVideogamesApi } from '../../../api/admin';

//stilo
import './AdminGames.scss'

export default function AdminGames() {
    const { Content, Header } = Layout;
    const [games, setGames] = useState([]);

    useEffect(() => {
        getVideogamesApi().then(response => {
            setGames(response);
        });
    }, []);
    
    return (
        <Layout>
            <div className="admin-juego-contenido">
                <Button type="primary" className="juego__button">
                    Registrar
                </Button>
                <Content>
                    <TableGame
                        games={games}
                    />
                </Content>
            </div>
        </Layout>
    );
}