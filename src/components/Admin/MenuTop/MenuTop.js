//Librerias
import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Dropdown, Menu} from 'antd';
import {UserOutlined, PoweroffOutlined, DownOutlined} from '@ant-design/icons';



//Estilos
import './MenuTop.scss';

//Assets
import logo from '../../../assets/img/palanca-de-mando.png';

export default function MenuTop(props){
    const {menuCollapsed, setMenuCollapsed} = props;

    const logoutUser =  () => {
        window.location.href="/home";
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
        <div className="admin-menu-top">
            <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)} >
                <img
                    className="admin-menu-top__left-logo"
                    src={logo}
                    alt="logo joystick"
                />
            </Button>
            <div className="admin-menu-top__right">
                <UserOutlined />
                <Dropdown overlay={menu}>
                    <a target="_blank" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <span className="admin-menu-top__right__user">{"user"}</span>  <DownOutlined />
                    </a>
               </Dropdown>
            </div>

        </div>
        
    );
}