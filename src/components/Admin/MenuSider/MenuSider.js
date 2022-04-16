import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import './MenuSider.scss';

function MenuSider(props) {
	const {Sider} = Layout;
	const {selectedKey, setSelectedKey, collapsed, setCollapsed, items} = props;

	return (
		<Sider className='admin-sider' collapsed={collapsed}>
			<div
                key="/home/epics"
                onClick={() => setCollapsed(!collapsed)}
                className="admin-sider__logo"
            >
                <h1>{collapsed ? "EI" : "EPICS IEEE"}</h1>
            </div>
			<Menu
				mode="inline" 
				selectedKeys={selectedKey}
				onSelect={e => setSelectedKey(e.key)}
				className="admin-sider__menu"
			>
                {items.map(i => (
                    // <Menu.Item key={i.to} className='admin-sider__item'>
                    //     <Link to={i.to}>
                    //     <span className="nav-text">{i.title}</span>
                    //     </Link>
                    // </Menu.Item>
                    <Menu.Item icon={<i.icon/>} key={i.to} className="admin-sider__item">
                    <Link to={i.to}>
                        {/* {<i.icon/>} */}
                        {/* <HomeOutlined /> */}
                        <span className="nav-text">{i.text}</span>
                    </Link>
                </Menu.Item>
                ))}
                {/* <Menu.Item key="/home" className="admin-sider__item">
                    <Link to={"/home"}>
                        <HomeOutlined />
                        <span className="nav-text">Inicio</span>
                    </Link>
                </Menu.Item>
                
                <Menu.Item key="/home/director" className="admin-sider__item">
                    <Link to={"/home/director"}>
                        <UserOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/home" className="admin-sider__item">
                    <Link to={"/home"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/home" className="admin-sider__item">
                    <Link to={"/home"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="/home" className="admin-sider__item">
                    <Link to={"/home"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item> */}

			</Menu>
		</Sider>
	);
}

export default withRouter(MenuSider);
