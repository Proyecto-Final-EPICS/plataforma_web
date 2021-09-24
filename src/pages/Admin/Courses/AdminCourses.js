//Liberias
import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';

import { useLocation, useParams } from 'react-router-dom';

//Componentes
import TableCourse from '../../../components/Admin/TableCourse';

//API
import { getColegiosApi } from '../../../api/admin';

//Estilos
import './AdminCourses.scss';

export default function AdminSchool() {
    const { Content, Header } = Layout;

    const [courses, setCourses] = useState([]);
    const { game } = useParams();

    const onSelectRows = (selRowKeys, selRows) => {
        console.log(selRowKeys, selRows);
    }

    const getCheckBoxProps = (record) => {
        console.log(record);
    }

    useEffect(() => {
        getColegiosApi().then(response => {
            // setSessions(response);
        });
    }, []);

    return (
        <Layout className="layout">
            <div className="admin-colegio-contenido">
                <Button type="primary" className="colegio__button">
                    Registrar
                </Button>
                
                <Content>
                    <TableCourse 
                        courses={courses}
                        onSelectRows={onSelectRows} 
                        getCheckBoxProps={getCheckBoxProps} 
                    />
                </Content>
            </div>
        </Layout>
    );
}
