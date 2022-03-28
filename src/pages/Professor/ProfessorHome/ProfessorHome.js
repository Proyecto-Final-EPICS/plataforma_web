//Liberias
import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

//Componentes
import GridCourses from './../../../components/Professor/GridCourses';
import ListApps from './../../../components/Professor/ListApps';

// Mock Data
import coursesApi from '../../../mock_data/collections/course.json'
import appsApi from '../../../mock_data/collections/app.json'

//Estilos
import './ProfessorHome.scss';

export default function ProfessorHome(){

    const [courses, setCourses] = useState([]);
    const [apps, setApps] = useState([]);

    useEffect(() => {
        setCourses(coursesApi);
        setApps(appsApi);
    }, []);

    return (
        <div className="professor-home">
            <Row className="professor-home__content" gutter={64}>
                <Col span={14}>
                <div className="professor-home__content__sec professor-home__courses">
                    <h1 className="professor-home__content__sec__title">Cursos</h1>
                    <div className="professor-home__content__sec__content">
                        <GridCourses courses={courses}/>
                    </div>
                </div>
                </Col>
                <Col span={10}>
                <div className="professor-home__content__sec professor-home__apps">
                    <h1 className="professor-home__content__sec__title">Aplicaciones</h1>
                    <div className="professor-home__content__sec__content">
                        <ListApps apps={apps}/>
                    </div>
                </div>
                </Col>
            </Row>
        </div>
    );
}
