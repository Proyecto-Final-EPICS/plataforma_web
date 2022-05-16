//Liberias
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, CalendarOutlined, BankOutlined, BookOutlined } from '@ant-design/icons';

import useAuth from '../../../hooks/useAuth';

//Estilos
import './MenuSider.scss';

function MenuSider(props){
    const { selectedKey, setSelectedKey } = props;
    const { firstname, lastname } = useAuth();
    
    const parseName = () => firstname ? `${firstname.split()[0]} ${lastname.split()[0]}` : "Perfil";

    return(
        <Menu 
            mode="inline" 
            selectedKeys={selectedKey}
            onSelect={e => setSelectedKey(e.key)}
            className="professor-sider-menu"
        >
            <Menu.Item key="/home" className="professor-sider-menu__item" icon={<HomeOutlined/>}>
                <Link to={"/home"}>
                <span>Inicio</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="/games" className="professor-sider-menu__item" icon={<BookOutlined/>}>
                <Link to={"/games"}>
                <span>Juegos</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="/profile" className="professor-sider-menu__item" icon={<UserOutlined/>}>
                <Link to={"/profile"}>
                <span>{parseName()}</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="/calendar" className="professor-sider-menu__item" icon={<CalendarOutlined/>}>
                <Link to={"/calendar"}>
                <span>Calendario</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="/institution" className="professor-sider-menu__item" icon={<BankOutlined/>}>
                <Link to={"/institution"}>
                <span>Institución</span>
                </Link>
            </Menu.Item>
        </Menu>
    );
}

export default withRouter(MenuSider);
