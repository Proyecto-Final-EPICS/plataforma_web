//Liberias
import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';

import { useLocation, useParams } from 'react-router-dom';

//Componentes
import ListColegios from '../../../components/Admin/ListColegios';

//API
import { getColegiosApi } from '../../../api/admin';

//Estilos
import './Courses.scss';

export default function AdminSchool() {
    const { Content, Header } = Layout;
    const data = {
        username: "",
        gameName: ""
    }

    const [sessions, setSessions] = useState([]);
    const { game } = useParams();

    useEffect(() => {
        data.username = "lpotte";
        data.gameName = "Secube";
        getColegiosApi().then(response => {
            setSessions(response);
        })
    }, [])

    return (
        <Layout className="layout">
            <div className="admin-colegio-contenido">
                <Button type="primary" className="colegio__button">
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
                    <ListColegios colegios={sessions} />
                </Content>
            </div>
        </Layout>
    );
}