//Liberías
import { Layout } from '../../../node_modules/antd';

//Componentes
import LoginForm from '../../components/General/LoginForm';


import { helloApi } from '../../api/web';

//Estilos
import './Login.scss';

//Assets
import Logo from '../../assets/img/palanca-de-mando.png';

export default function Login(){
    helloApi().then(json => console.log(json));
    
    const { Content } = Layout;
    
    return (
        <Layout className="sign-in">
            <Content className = "sign-in__content">
                <h1 className="sign-in__content__logo">
                    <img src={Logo} alt="Logo joystick"/>
                </h1>

                <div className="sign-in__content__form">
                    <h1>LOGIN</h1>
                    <LoginForm/>
                </div>
            </Content>
        </Layout>
    );
}
