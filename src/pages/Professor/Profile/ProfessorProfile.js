import { Row, Col, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import { EditOutlined } from '@ant-design/icons';

import useAuth from '../../../hooks/useAuth';

import { parseName, getAgeFromBirthDate } from '../../../libraries/General/utils';

import professorApi from '../../../mock_data/collections/professor.json';

import './ProfessorProfile.scss';

export default function ProfessorProfile(props) {
	const [professor, setProfessor] = useState(null);
	const [photoButtonVisible, setPhotoButtonVisible] = useState(false);

	const { username } = useAuth();

	useEffect(() => {
		setProfessor(professorApi.find(p => p.username === username));
	}, []);

	return (
		<>{professor && 
			<div className='professor-profile'>
				<div className='professor-profile__background'/>

				<div className='professor-profile__main'>
					<span className='professor-profile__main__presentation'>
						<span
							onMouseEnter={() => setPhotoButtonVisible(true)}
							onMouseLeave={() => setPhotoButtonVisible(false)}
						>
							<img
								src={professor.photo}
								alt='Imagen de perfil'
							/>
							<Button 
								shape='circle' 
								size='large'
								icon={<EditOutlined/>} 
								style={{visibility: photoButtonVisible ? 'visible' : 'hidden'}}
							/>
						</span>
						<div className='professor-profile__main__presentation__name'>
							{parseName(professor.firstname, professor.lastname)}
						</div>
					</span>
				</div>

				<div className='professor-profile__info'>
					<div className='professor-profile__info__pers'>
						<div className='professor-profile__info__title'>
							Información Personal
						</div>
						<div className='professor-profile__info__data'>
							<Row gutter={20} className='professor-profile__info__data__row'>
								<Col span={12} className='professor-profile__info__data__col'>
									Nombres
									<Input disabled value={professor.firstname}/>
								</Col>
								<Col span={12} className='professor-profile__info__data__col'>
									Apellidos
									<Input disabled value={professor.lastname}/>
								</Col>
							</Row>
							<Row gutter={20} className='professor-profile__info__data__row'>
								<Col span={9} className='professor-profile__info__data__col'>
									Cédula
									<Input disabled value={professor.identityDoc}/>
								</Col>
								<Col span={5} className='professor-profile__info__data__col'>
									Edad
									<Input disabled value={getAgeFromBirthDate(professor.birthDate)}/>
								</Col>
								<Col span={10} className='professor-profile__info__data__col'>
									Género
									<Input disabled value={professor.gender}/>
								</Col>
							</Row>
						</div>
						<div className='professor-profile__info__options'>
							<Button type='primary' disabled>Cancelar</Button>
							<Button type='primary' disabled>Guardar Cambios</Button>
						</div>
					</div>

					<div className='professor-profile__info__user'>
						<div className='professor-profile__info__title'>
							Información de Usuario
						</div>
						<div className='professor-profile__info__data'>
							<Row gutter={20} className='professor-profile__info__data__row'>
								<Col span={12} className='professor-profile__info__data__col'>
									Username
									<Input disabled value={professor.username}/>
								</Col>
								<Col span={12} className='professor-profile__info__data__col'>
									Contraseña
									<Button type='default'>Cambiar contraseña</Button>
								</Col>
							</Row>
						</div>
						<div className='professor-profile__info__options'>
							<Button type='primary' disabled>Cancelar</Button>
							<Button type='primary' disabled>Guardar Cambios</Button>
						</div>
					</div>

					<div className='professor-profile__info__contact'>
						<div className='professor-profile__info__title'>
							Información de Contacto
						</div>
						<div className='professor-profile__info__data'>
							<Row gutter={20} className='professor-profile__info__data__row'>
								<Col span={12} className='professor-profile__info__data__col'>
									Email
									<Input disabled value={professor.email}/>
								</Col>
								<Col span={12} className='professor-profile__info__data__col'>
									Teléfono
									<Input
										disabled
										value={`+${professor.phone.countryCode} ${professor.phone.number}`}
									/>
								</Col>
							</Row>
						</div>
						<div className='professor-profile__info__options'>
							<Button type='primary' disabled>Cancelar</Button>
							<Button type='primary' disabled>Guardar Cambios</Button>
						</div>
					</div>
				</div>
			</div>
		}</>
	);
}