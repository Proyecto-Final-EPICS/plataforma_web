//Liberías
import React from 'react';
import { Layout } from '../../../node_modules/antd';
import { Route, Redirect, Link } from 'react-router-dom';
import {Button} from 'antd';

//Componentes
import LoginForm from '../../components/General/LoginForm';

import useAuth from '../../hooks/useAuth';

//Estilos
import './Login.scss';

//Assets
import Logo from '../../assets/img/palanca-de-mando.png';

export default function Login(){
    const { Content } = Layout;
    const { username, isLoading } = useAuth();

    if (username && !isLoading) return <Redirect to="/home"/>;
    else if(!username && !isLoading) {

        if(window.location.pathname=="/") return <Redirect to="/login"/>
        return (
            <Layout className="sign-in">
                <Content className = "sign-in__content">
                    <h1 className="sign-in__content__logo">
                        <img src={Logo} alt="Logo joystick"/>
                    </h1>
    
                    <div className="sign-in__content__form">
                        <h1>LOGIN</h1>
                        <LoginForm/>
    
                        {/* <div > */}
                        {/* <Link to={'/sign-up'} className="sign-in__content__form__sign-up">
                        <Button type="link">
                            ¿No estás registrado?
                        </Button>
                        </Link> */}
                        {/* </div> */}
                    </div>
                </Content>
            </Layout>
        );
    }

    return null;
}

