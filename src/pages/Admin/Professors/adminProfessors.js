//Liberias
import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';

//Componentes
import ListProfessors from '../../../components/Admin/Professor/ListProfessors';

//API
import { getProfessorsApi } from '../../../api/admin';

//Estilos
import './AdminProfessor.scss';

export default function AdminProfessors() {
    const { Content, Header } = Layout;
    const [professors, setProfesor] = useState([]);
    useEffect(() => {
        getProfessorsApi().then(response => {
            setProfesor(response);
        })
    }, [])
    return (
        <Layout>
            <div className="admin-colegio-contenido">
                <Button type="primary" className="professor__button">
                    Registrar
                </Button>
                <Content>
                    <Header className="admin-professor-contenido__header">
                        <div className="admin-professor-contenido__header__col">
                            <h1>Nombre</h1>
                        </div>

                        <div className="admin-professor-contenido__header__col">
                            <h1>Editar</h1>
                        </div>
                    </Header>
                    <ListProfessors profesores={professors} />
                </Content>
            </div>
        </Layout>
    );
}