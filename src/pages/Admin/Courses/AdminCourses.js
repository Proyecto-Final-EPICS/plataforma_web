//Liberias
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { Layout, Button } from 'antd';

//Componentes
import TableCourse from '../../../components/Admin/TableCourse';

//API
// import { getColegiosApi } from '../../../api/admin';

//Estilos
import './AdminCourses.scss';

//...
const { Content } = Layout;

export default function AdminCourses(props) {
    const [courses, setCourses] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        setDefCourses(setCourses);
    }, []);

    return (
        <Layout className="layout">
            <div className="admin-colegio-contenido">
                <Content>
                    <Button 
                        className="colegio__button"
                    >
                        Registrar Curso
                    </Button>
                    <TableCourse 
                        courses={courses}
                        selectedRowKeys={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
                    />
                </Content>
                <Button 
                    disabled={!selectedRowKeys.length}
                    type="primary" 
                    // onClick={}
                >
                    Ver Seleccionados
                </Button>
            </div>
        </Layout>
    );
}

const setDefCourses = setCourses => {
    const courses = [
        {
            code: "C01",
            name: 'Curso 01',
            period: '2021',
            level: 'B1',
            professors: [
                {
                    firstname: 'Juan',
                    lastname: 'Pérez Arboleda',
                    username: 'jpereza',
                },
                {
                    firstname: 'Alma Patricia',
                    lastname: 'Madero Benítez',
                    username: 'amben',
                },
            ],
        },
        {
            code: "C02",
            name: 'Curso 02',
            period: '2021',
            level: 'C2',
            professors: [
                {
                    firstname: 'Juan',
                    lastname: 'Pérez Arboleda',
                    username: 'jpereza',
                },
            ],
        },
        {
            code: "C03",
            name: 'Curso 03',
            period: '2021',
            level: 'A2',
            professors: [
                {
                    firstname: 'Alma Patricia',
                    lastname: 'Madero Benítez',
                    username: 'amben',
                },
            ],
        },
    ];
    setCourses(courses);
    setCourses(courses.map(el => {
        const {code, name, period, level, professors} = el;
        return {code, name, period, level, professors};
    }));
}