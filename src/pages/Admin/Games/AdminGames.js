//Liberias
import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';

//Componentes
import ListGames from '../../../components/Admin/ListGames';

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
        })
    }, [])
    return (
        <Layout>
            <div className="admin-juego-contenido">
                <Button type="primary" className="juego__button">
                    Registrar
                </Button>
                <Content>
                    <Header className="admin-colegio-contenido__header">
                        <div className="admin-colegio-contenido__header__col">
                            <h1>Nombre</h1>
                        </div>

                        <div className="admin-colegio-contenido__header__col">
                            <h1>Editar</h1>
                        </div>
                    </Header>
                    <ListGames games={games} />
                </Content>
            </div>
        </Layout>
    );
}