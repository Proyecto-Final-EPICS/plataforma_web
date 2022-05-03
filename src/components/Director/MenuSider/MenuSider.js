//Liberias
// import React, {useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {HomeOutlined, TeamOutlined, RocketOutlined, BookOutlined} from '@ant-design/icons';

//Estilos
import './MenuSider.scss';

function MenuSider(props) {
    const {menuCollapsed, selectedKey, setSelectedKey} = props;
    const {Sider} = Layout;
    
    return (
        <Sider className="director-sider" collapsed={menuCollapsed}>
            <Menu 
                mode="inline" 
                selectedKeys={selectedKey}
                onSelect={e => setSelectedKey(e.key)}
                className="director-sider__menu"
            >
                <Menu.Item key="/home" className="director-sider__item" icon={<HomeOutlined/>}>
                    <Link to={"/home"}>
                    <span className="nav-text">Inicio</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/courses" className="director-sider__item" icon={<BookOutlined/>}>
                    <Link to={"/courses"}>
                    <span className="nav-text">Cursos</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/professors" className="director-sider__item" icon={<TeamOutlined/>}>
                    <Link to={"/professors"}>
                    <span className="nav-text">Profesores</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/apps" className="director-sider__item" icon={<RocketOutlined />}>
                    <Link to={"/apps"}>
                    <span className="nav-text">Aplicaciones</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default withRouter(MenuSider);
