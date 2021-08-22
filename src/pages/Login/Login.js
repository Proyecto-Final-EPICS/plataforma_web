//Liberías
import React from 'react';
import { Layout,Row,Col} from '../../../node_modules/antd';
import { Redirect } from 'react-router-dom';

//Componentes
import LoginForm from '../../components/General/LoginForm';

//Api}
import {getAccessTokenApi} from '../../api/auth';

//Estilos
import './Login.scss';

//Assets
import Logo from '../../assets/img/palanca-de-mando.png';

export default function Login(){
    const { Content } = Layout;


    //Si el user está logeado no lo deja entrar al login
    if(getAccessTokenApi()){
      return <Redirect to="/home" />
    }
    return(
      <Layout className="sign-in">
          <Content className = "sign-in__content">
              <h1 className="sign-in__content__logo">
                  <img src={Logo} alt="Logo joystick"/>
              </h1>

              <div className="sign-in__content-form">
                  <Row>
                    <Col span={24}>
                     <h1 className="sign-in__content-form-titulo">LOGIN</h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <LoginForm/>
                    </Col>
                  </Row>
              </div>    
          </Content>
      </Layout>


    );
}

