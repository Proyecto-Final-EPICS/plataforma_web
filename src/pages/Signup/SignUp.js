//Librerías
import {Row, Col, Layout} from 'antd';

//Componentes
import SignUpProfessorForm from '../../components/Professor/Forms/SignUp/SignUpProfessorForm';

//Estilos
import './SignUp.scss';

//Assets
import Logo from '../../assets/img/palanca-de-mando.png';

//...
const {Content, Footer} = Layout;

export default function SignUp(props) {
	
	return (
		<Layout className="sign-up">
		<Content className="sign-up__content">
		<Row>
			<Col span={10}>
				<Layout className="sign-up__content__panel">
					<Content className="sign-up__content__panel__content">
						<img src={Logo} alt="Logo joystick"/>
						<h1>NombreColegio</h1>
					</Content>
					<Footer className="sign-up__content__panel__footer">
						<span> &copy; EPICS IEEE</span>
					</Footer>
				</Layout>
			</Col>
			<Col span={14}>
				<div className="sign-up__content__form">
					<h1>Registro</h1>
					<SignUpProfessorForm/>
				</div>
			</Col>

		</Row>
		</Content>
		</Layout>
	);
}