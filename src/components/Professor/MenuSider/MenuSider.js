//Liberias
import {useContext} from 'react';
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
                className="professor-sider__logo"
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
                <Menu.Item key="/home" className="professor-sider__item" icon={<HomeOutlined/>}>
                    <Link to={"/home"}>
                    <span className="nav-text">Inicio</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/home/profile" className="professor-sider__item" icon={<UserOutlined/>}>
                    <Link to={"/home/profile"}>
                    <span className="nav-text">{parseName()}</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/home/calendar" className="professor-sider__item" icon={<CalendarOutlined/>}>
                    <Link to={"/home/calendar"}>
                    <span className="nav-text">Calendario</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/home/grades" className="professor-sider__item" icon={<FileSearchOutlined />}>
                    <Link to={"/home/grades"}>
                    <span className="nav-text">Calificaciones</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/home/institution" className="professor-sider__item" icon={<BankOutlined/>}>
                    <Link to={"/home/institution"}>
                    <span className="nav-text">Institución</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default withRouter(MenuSider);
