//Liberias
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {HomeOutlined, UserOutlined, DesktopOutlined} from '@ant-design/icons';


//Estilos
import './MenuSider.scss';

function MenuSider(props){
    const {menuCollapsed, location} = props;
    const {Sider} = Layout;

    return(
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu mode="inline" defaultSelectedKeys={[location.pathname]} className="admin-sider__menu">

                <Menu.Item key="/admin-home/schools" className="admin-sider__item">
                    <Link to={"/admin-home/schools"}>
                        <HomeOutlined />
                        <span className="nav-text">Colegios</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin-home/professors" className="admin-sider__item">
                    <Link to={"/admin-home/professors"}>
                        <UserOutlined />
                        <span className="nav-text">Profesores</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/admin-home/games" className="admin-sider__item">
                    <Link to={"/admin-home/games"}>
                        <DesktopOutlined />
                        <span className="nav-text">Videojuegos</span>
                    </Link>
                </Menu.Item>


            </Menu>
            
        </Sider>
    );
}


export default withRouter(MenuSider);