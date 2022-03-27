//Librerias
import React from 'react';
import { Link } from 'react-router-dom';
import {Button,Menu,Dropdown} from 'antd';
import {PoweroffOutlined,DownOutlined,UserOutlined} from '@ant-design/icons';

//Api
import {logout} from '../../../api/auth';

//Hooks
import useAuth from '../../../hooks/useAuth';

//Estilos
import './MenuTop.scss';

//Assets
import logo from '../../../assets/img/palanca-de-mando.png';

export default function MenuTop(){
    const {username} = useAuth();

    const logoutUser = () => {
        logout();
        window.location.reload();
    }
    
    const menu = (
        <Menu>
            <Menu.Item>
                <Button type="link" onClick={logoutUser}> 
                    Logout
                    <PoweroffOutlined/>
                </Button>
            </Menu.Item>
        </Menu>
    )

    return(
        <div className="menu-top">
            <Link to="/home">
                <img
                    className="menu-top__left-logo"
                    src={logo}
                    alt="logo joystick"
                />
            </Link>
         
            <div className="menu-top__right">
               
                <div className="menu-top__right__image">
                  <UserOutlined />
                </div>
               
               <Dropdown overlay={menu}>
                    <a target="_blank" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <span className="menu-top__right__user">{username}</span> <DownOutlined />
                    </a>
               </Dropdown>
            </div>

        </div>
        
    );
}
