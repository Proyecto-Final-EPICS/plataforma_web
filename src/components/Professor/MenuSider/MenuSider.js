//Liberias
import {useContext} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import {
    HomeOutlined, UserOutlined, DesktopOutlined, CalendarOutlined, BankOutlined, FileSearchOutlined
} from '@ant-design/icons';

import ProfessorContext from '../ProfessorContext';

//Estilos
import './MenuSider.scss';

function MenuSider(props){
    const {selectedKey, setSelectedKey} = props;
    const {userInfo} = useContext(ProfessorContext);
    
    const parseName = () => (
        userInfo.firstname?
        `${userInfo.firstname.split()[0]} ${userInfo.lastname.split()[0]}` : "Perfil"
    );

    return(
        <Menu 
            mode="inline" 
            selectedKeys={selectedKey}
            onSelect={e => setSelectedKey(e.key)}
            className="professor-sider-menu"
        >
            <Menu.Item key="/home" className="professor-sider-menu__item" icon={<HomeOutlined/>}>
                <Link to={"/home"}>
                <span className="nav-text">Inicio</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="/profile" className="professor-sider-menu__item" icon={<UserOutlined/>}>
                <Link to={"/profile"}>
                <span className="nav-text">{parseName()}</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="/calendar" className="professor-sider-menu__item" icon={<CalendarOutlined/>}>
                <Link to={"/calendar"}>
                <span className="nav-text">Calendario</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="/institution" className="professor-sider-menu__item" icon={<BankOutlined/>}>
                <Link to={"/institution"}>
                <span className="nav-text">Institución</span>
                </Link>
            </Menu.Item>
        </Menu>
    );
}

export default withRouter(MenuSider);
