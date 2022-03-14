//Liberías
// import React, {useState} from 'react';
import {Form, Input, Button, notification} from 'antd';

//Iconos
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//API
import {signinAPI} from'../../../api/users'

//Utils
import {ACCESS_TOKEN} from '../../../utils/constants'

//Estilos
import './LoginForm.scss';

export default function LoginForm(){

    const login = async values => {
        if(!values.username || !values.password) return;
    
        const result = await signinAPI(values);
        console.log(result);
        
        const {token} = result;

        if (token === "none") {
            notification["error"]({
                message:"Contraseña o usuario incorrecto"
            });
        }else{
            //Access token almacenado en el local storage
            localStorage.setItem(ACCESS_TOKEN, token);
    
            notification["success"]({
                message: "Login correcto"
            });
    
            window.location.href= "/admin";
        }
    }

    return (
        <Form className="login-form" onFinish={login}>
            <Form.Item
                name="username"
            >
                <Input
                    prefix={<UserOutlined/>}
                    type="text"
                    
                    placeholder="Usuario"
                    className="login-form__input"
                />
            </Form.Item>

            <Form.Item
                name="password"
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Contraseña"
                    className="login-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                    Ingresar
                </Button>
            </Form.Item>
        </Form>
    );
}