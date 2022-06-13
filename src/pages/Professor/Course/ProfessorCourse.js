import { useState, useEffect } from 'react';
import { matchPath, Link } from 'react-router-dom';

import { Row, Col, Button, message } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import Modal from '../../../components/General/Modal';
import GameForm from '../../../components/Professor/Forms/GameForm';
import ListStudents from '../../../components/Professor/ListStudents';
import ListGamesMini from '../../../components/Professor/ListGamesMini';

import useAuth from '../../../hooks/useAuth';

import courseApi from '../../../mock_data/collections/course.json';
import gameApi from '../../../mock_data/collections/game.json';
import studentApi from '../../../mock_data/collections/student.json';

import { getCourseFromSchool } from '../../../api/course';

import './ProfessorCourse.scss';
import { getSchool } from '../../../api/school';

export default function ProfessorCourse() {
	const [course, setCourse] = useState(null);
	const [students, setStudents] = useState([]);
	const [games, setGames] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [modalContent, setModalContent] = useState(null);
	const { id_school } = useAuth();

	const addGame = () => {
		getSchool(id_school).then(json => {
			const otherGames = json.games.filter(g => !games.some(g2 => g2.code === g.code));
			if(!otherGames.length) return message.info('Este curso tiene todos los juegos disponibles');
	
			setModalContent(
				<GameForm
					id_school={id_school}
					course_code={course.code}
					setModalVisible={setModalVisible}
					games={otherGames}
					setGames={setGames}
				/>);
			setModalTitle('Añadir Juego(s)');
			setModalVisible(true);
		})
	}

	const remGame = () => {
		if(!games.length) return message.info('Este curso no tiene juegos');

		setModalContent(
			<GameForm
				id_school={id_school}
				course_code={course.code}
				setModalVisible={setModalVisible}
				games={games}
				setGames={setGames}
				rem
			/>);
		setModalTitle('Retirar Juego(s)');
		setModalVisible(true);
	}

	const getCourse = () => {
        const matchCourse = matchPath(window.location.pathname, { path: '/home/:course' });
        return matchCourse && matchCourse.params.course;
    }

	useEffect(() => {
		getCourseFromSchool(id_school, getCourse()).then(json => {
			console.log(json);
			setCourse(json);
			setStudents(json.students);
			setGames(json.games);
		});
	}, []);

	return (
		<>
		{course &&
		<div className='professor-course'>
			<Modal
				isVisible={modalVisible}
				setIsVisible={setModalVisible}
				title={modalTitle}
			>
				{modalContent}
			</Modal>
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
							<Button className='button-purple' type='primary'>
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
					<ListGamesMini games={games}/>
					<div className='professor-course__games__options'>
						<Button 
							className='button-purple' 
							onClick={addGame} 
							type='primary'
						>
							Añadir
						</Button>
						<Button 
							className='button-purple' 
							onClick={remGame} 
							type='primary'
						>
							Retirar
						</Button>
					</div>
				</Col>
			</Row>
		</div>}
		</>
	);
}