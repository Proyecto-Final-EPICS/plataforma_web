//Liberias
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

//Componentes
import GridCourses from './../../../components/Professor/GridCourses';
import ListGamesMini from './../../../components/Professor/ListGamesMini';

// Mock Data
import { getCoursesFromSchool } from '../../../api/course';
import { getGamesFromSchool } from '../../../api/game';
import { getProfessorFromSchool } from '../../../api/professor';

import useAuth from '../../../hooks/useAuth';

import qs from 'query-string';

//Estilos
import './ProfessorHome.scss';
import { getSchool } from '../../../api/school';

export default function ProfessorHome() {
    const [games, setGames] = useState([]);
    const [courses, setCourses] = useState([]);
    const { username, id_school } = useAuth();

    const redirectStatistics = () => {
        const query = {cur: []};
        courses.forEach(c => query.cur.push(c.code));
        return {
            pathname: '/statistics',
            search: qs.stringify(query),
        }
    }

    useEffect(() => {
        getProfessorFromSchool(id_school, username).then(json => setCourses(json.courses));
        getSchool(id_school).then(json => setGames(json.games))
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
