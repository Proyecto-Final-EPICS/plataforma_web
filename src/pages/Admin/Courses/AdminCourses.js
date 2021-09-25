//Liberias
import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';

//Componentes
import TableCourse from '../../../components/Admin/TableCourse';

//API
// import { getColegiosApi } from '../../../api/admin';

//Estilos
import './AdminCourses.scss';

export default function AdminSchool() {
    const { Content, Header } = Layout;

    const [courses, setCourses] = useState([]);

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

                    />
                </Content>
                <Button 
                    type="primary" 
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