//Liberias
import React, {useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {HomeOutlined, UserOutlined, DesktopOutlined} from '@ant-design/icons';


//Estilos
import './MenuSider.scss';

//...
const {Sider} = Layout;

function MenuSider(props){
    const {menuCollapsed, selectedKey, setSelectedKey} = props;
    
    return(
        <Sider className="director-sider" collapsed={menuCollapsed}>
            <Menu 
                mode="inline" 
                // defaultSelectedKeys={[location.pathname]} 
                selectedKeys={selectedKey}
                onSelect={e => setSelectedKey(e.key)}
                className="director-sider__menu"
            >

                <Menu.Item key="/home/courses" className="director-sider__item">
                    <Link to={"/home/courses"}>
                        <HomeOutlined />
                        <span className="nav-text">Cursos</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/home/professors" className="director-sider__item">
                    <Link to={"/home/professors"}>
                        <UserOutlined />
                        <span className="nav-text">Profesores</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/home/apps" className="director-sider__item">
                    <Link to={"/home/apps"}>
                        <DesktopOutlined />
                        <span className="nav-text">Aplicaciones</span>
                    </Link>
                </Menu.Item>


            </Menu>
            
        </Sider>
    );
}


export default withRouter(MenuSider);