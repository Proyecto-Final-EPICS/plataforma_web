import { useState, useEffect, useContext } from 'react';
import { matchPath, Link } from 'react-router-dom';

import { Row, Col, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import ProfessorContext from '../../../components/Professor/ProfessorContext';

import ListStudents from '../../../components/Professor/ListStudents';
import ListGames from '../../../components/Professor/ListGames';

import professorApi from '../../../mock_data/collections/professor.json';
import courseApi from '../../../mock_data/collections/course.json';
import gameApi from '../../../mock_data/collections/game.json';
import studentApi from '../../../mock_data/collections/student.json';

import './ProfessorCourse.scss';

export default function ProfessorCourse() {
	const [course, setCourse] = useState(null);
	const [students, setStudents] = useState([]);
	const [games, setGames] = useState([]);
	const { userInfo } = useContext(ProfessorContext);
	
	const getCourse = () => {
        const matchCourse = matchPath(window.location.pathname, { path: '/home/:course' });
        return matchCourse && matchCourse.params.course;
    }

	useEffect(() => {
		const { username, school } = userInfo;
		if(!username) return;
		
		const id = `${school}-${getCourse()}`;
		const course = courseApi.find(c => c.id == id);

		setCourse(course);
		setStudents(course.students.map(s => studentApi.find(s2 => s2.username == s.username)));
		setGames(course.games.map(g => gameApi.find(g2 => g2.code == g.code)));
	}, [userInfo]);

	return (
		<>
			{course &&
			<div className='professor-course'>
			<Row className='professor-course__row' gutter={32}>
				<Col span={10}>
				<div className='professor-course__summ'>
					<div className='professor-course__summ__info'>
						<h1>{course.name}</h1>
						<h2>{`Código: ${course.code}`}</h2>
						<h2>{`Nivel requerido: ${course.level}`}</h2>
						<h2>{`Estudiantes: ${course.students.length} / ${course.capacity}`}</h2>
					</div>
					<div className='professor-course__summ__stats'>
						<Link
							to={`/statistics?cur=${course.code}`}
							target="_blank" 
							referrerPolicy="no-referrer"
						>
							<Button type='primary'>
								Ver Estadísticas
								<ArrowRightOutlined />
							</Button>
						</Link>
					</div>
				</div>
				</Col>
				
				<Col className='professor-course__students' span={7}>
					<h1 className='professor-course__title'>Estudiantes</h1>
					<ListStudents students={students}/>
				</Col>

				<Col className='professor-course__games' span={7}>
					<h1 className='professor-course__title'>Juegos</h1>
					<ListGames games={games}/>
					<div className='professor-course__games__store'>
						<Link to={`/home/${course.code}/game-store`}>
							<Button type='primary' >Ver más</Button>
						</Link>
					</div>
				</Col>
			</Row>
			</div>}
		</>
	);
}