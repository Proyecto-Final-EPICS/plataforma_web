//Liberias
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, TeamOutlined, RocketOutlined, BookOutlined } from '@ant-design/icons';

//Estilos
import './MenuSider.scss';

function MenuSider(props) {
    const {selectedKey, setSelectedKey} = props;
    
    return (
        <Menu 
            mode="inline" 
            selectedKeys={selectedKey}
            onSelect={e => setSelectedKey(e.key)}
            className="director-sider-menu"
        >
            <Menu.Item key="/home" className="director-sider-menu__item" icon={<HomeOutlined/>}>
                <Link to={"/home"}>
                <span>Inicio</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="/courses" className="director-sider-menu__item" icon={<BookOutlined/>}>
                <Link to={"/courses"}>
                <span>Cursos</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="/professors" className="director-sider-menu__item" icon={<TeamOutlined/>}>
                <Link to={"/professors"}>
                <span>Profesores</span>
                </Link>
            </Menu.Item>

            <Menu.Item key="/games" className="director-sider-menu__item" icon={<RocketOutlined />}>
                <Link to={"/games"}>
                <span>Juegos</span>
                </Link>
            </Menu.Item>
        </Menu>
    );
}

export default withRouter(MenuSider);
