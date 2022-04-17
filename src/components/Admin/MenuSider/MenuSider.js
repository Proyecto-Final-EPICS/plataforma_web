import { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import AdminContext from '../AdminContext';

import { logout } from '../../../api/auth';

import './MenuSider.scss';

function MenuSider(props) {
	const { selectedKey, setSelectedKey, items } = props;
    const { setRowSel } = useContext(AdminContext);

    const onLinkClick = to => to !== window.location.pathname && setRowSel(-1);

    const onLogout = e => {
        logout();
        window.location.reload();
    }

    const onSelectItem = e => e.key !== 'logout' && setSelectedKey(e.key);

	return (
        <Menu
            mode="inline" 
            selectedKeys={selectedKey}
            onSelect={onSelectItem}
            className="admin-sider-menu"
        >
            {items.map(i => (
                <Menu.Item 
                    className="admin-sider-menu__item"
                    key={i.to}
                    icon={<i.icon/>}
                >
                    {/* <Link to={() => linkTo(i.to)}> */}
                    <Link to={i.to} onClick={() => onLinkClick(i.to)}>
                        <span className="nav-text">{i.text}</span>
                    </Link>
                </Menu.Item>
            ))}
            {/* <div
                className="admin-sider-menu__logout"
                key="logout"
            >
                <span></span>
                <span className='nav-text'><LogoutOutlined/> Logout</span>
            </div> */}
            <Menu.Item
                className="admin-sider-menu__logout"
                key={"logout"}
                icon={<LogoutOutlined/>}
                onClick={onLogout}
            >
                <span className='nav-text'>Logout</span>
            </Menu.Item>
        </Menu>
	);
}

export default withRouter(MenuSider);
