//Liberias
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

//Componentes
import GridCourses from './../../../components/Professor/GridCourses';
import ListGamesMini from './../../../components/Professor/ListGamesMini';

// Mock Data
import courseApi from '../../../mock_data/collections/course.json'
import gameApi from '../../../mock_data/collections/game.json'

import useAuth from '../../../hooks/useAuth';

import qs from 'query-string';

//Estilos
import './ProfessorHome.scss';

export default function ProfessorHome() {
    const [games, setGames] = useState([]);
    const [courses, setCourses] = useState([]);
    const { username, school } = useAuth();

    const redirectStatistics = () => {
        const query = {cur: []};
        courses.forEach(c => query.cur.push(c.code));
        return {
            pathname: '/statistics',
            search: qs.stringify(query),
        }
    }

    useEffect(() => {
        setCourses(courseApi.filter(c => c.school == school 
            && c.professors.some(p => p.username == username)));
        setGames(gameApi.filter(g => g.school == school));
    }, []);

    return (
        <div className="professor-home">
            <Row gutter={32}>
                <Col span={14}>
                <div className="professor-home__sec">
                    <h1 className="professor-home__sec__title">Cursos</h1>
                    <div className="professor-home__sec__content">
                        <GridCourses courses={courses}/>
                    </div>
                </div>
                </Col>
                <Col span={10}>
                <div className="professor-home__sec">
                    <h1 className="professor-home__sec__title">Juegos</h1>
                    <div className="professor-home__sec__content">
                        <ListGamesMini games={games}/>
                    </div>
                </div>
                </Col>
            </Row>
            <div className='professor-home__stats'>
                <Link
                    to={redirectStatistics}
                    target="_blank" 
                    referrerPolicy="no-referrer"
                >
                    <Button type='primary' className='button-purple'>
                        Ver Estadísticas
                        <ArrowRightOutlined />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
