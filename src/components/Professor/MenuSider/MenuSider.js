//Liberias
import {useState, useEffect, useContext} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined, UserOutlined, DesktopOutlined, CalendarOutlined, BankOutlined, FileSearchOutlined
} from '@ant-design/icons';

import ProfessorContext from '../ProfessorContext';

//Estilos
import './MenuSider.scss';

function MenuSider(props){
    const {Sider} = Layout;
    const {selectedKey, setSelectedKey, collapsed, setCollapsed} = props;

    const {userInfo} = useContext(ProfessorContext);
    
    const parseName = () => (
        userInfo.firstname?
        `${userInfo.firstname.split()[0]} ${userInfo.lastname.split()[0]}` : "Perfil"
    );

    return(
        <Sider className="professor-sider" collapsed={collapsed}>
            <div
                key="/home/epics"
                onClick={() => setCollapsed(!collapsed)}
                className="professor-sider__col"
            >
                {collapsed ? "EI" : "EPICS IEEE"}
            </div>
            <Menu 
                mode="inline" 
                // defaultSelectedKeys={[location.pathname]} 
                selectedKeys={selectedKey}
                onSelect={e => setSelectedKey(e.key)}
                className="professor-sider__menu"
            >

                <Menu.Item key="/home" className="professor-sider__item">
                    <Link to={"/home"}>
                        <BankOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/home/profile" className="professor-sider__item">
                    <Link to={"/home/profile"}>
                        <UserOutlined />
                        <span className="nav-text">{parseName()}</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/home/activities" className="professor-sider__item">
                    <Link to={"/home/activities"}>
                        <CalendarOutlined />
                        <span className="nav-text">Calendario</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/home/grades" className="professor-sider__item">
                    <Link to={"/home/grades"}>
                        <FileSearchOutlined />
                        <span className="nav-text">Calificaciones</span>
                    </Link>
                </Menu.Item>

            </Menu>
            
        </Sider>
    );
}


export default withRouter(MenuSider);