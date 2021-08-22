//Liberías
import React,{useState} from 'react';
import {Form, Input, Button, notification} from 'antd';

//Iconos
import { UserOutlined, LockOutlined} from '@ant-design/icons';

//API
import {signinAPI} from'../../../api/users'


//Utils
import {ACCESS_TOKEN} from '../../../utils/constants'

//Estilos
import './LoginForm.scss';



export default function LoginForm(){
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });


    const changeForm = e =>{
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    
    // const login = async () => {
    //     const result = await signinAPI(inputs);
    //     console.log(result);
    //     if(result.ok){
    //         window.location.href="/home";
    //     }else {
    //         notification["error"]({message:"Contraseña o usuario incorrecto"});
    //     }
    // }

    const login = async e =>{
        const result = await signinAPI(inputs)
        if(result.token ==="none"){
            notification["error"]({
                message:"Contraseña o usuario incorrecto"
            });
        }else{
            const {token} = result;
            //Access token almacenado en el local storage
            //localStorage.setItem(key,value) 
            localStorage.setItem(ACCESS_TOKEN,token);

            notification["success"]({
                message: "Login correcto"
            });

            window.location.href= "/home";
        }
    }

    return(
        <Form className="login-form" onChange={changeForm} onFieldsChange={login}>
            
            <Form.Item>
                <Input
                    prefix={<UserOutlined/>}
                    type="text"
                    name="username"
                    placeholder="Usuario"
                    className="login-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    name="password"
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