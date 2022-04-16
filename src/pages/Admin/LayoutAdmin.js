import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';

import {
    HomeOutlined, UserOutlined, TeamOutlined, BookOutlined, BankOutlined, SmileOutlined
} from '@ant-design/icons';

import useAuth from '../../hooks/useAuth';
import AdminContext from '../../components/Admin/AdminContext';

import MenuSider from './../../components/Admin/MenuSider';
import MenuTop from '../../components/Admin/MenuTop';

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    const {routes} = props;
    
    const { Content, Footer } = Layout;

    const [menuSelectedKey, setMenuSelectedKey] = useState(window.location.pathname);
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const [rowSel, setRowSel] = useState(-1);
    const [search, setSearch] = useState('');

    const {username, isLoading} = useAuth();

    const menuItems = getMenuItems();
    const optionsAvailable = () => {
        for(let i of menuItems)
            if(i.to === menuSelectedKey && i.to !== '/home') return true;
        return false;
    }
    // console.log(optionsAvailable());

    if(!username && !isLoading) return <Redirect to="/login"/>;

    if(username && !isLoading) {
        if(window.location.pathname == "/") return <Redirect to="/home"/>;
        return (
            <Layout>
                <MenuSider
                    selectedKey={menuSelectedKey}
                    setSelectedKey={setMenuSelectedKey}
                    collapsed={menuCollapsed}
                    setCollapsed={setMenuCollapsed}
                    items={menuItems}
                />
                <Content>
                    <Layout
                        className='layout-admin'
                        // style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
                    >
                        <MenuTop
                            rowSel={rowSel}
                            setRowSel={setRowSel}
                            optionsAvailable={optionsAvailable()}
                        />
                        <Content className="layout-admin__content">
                            <LoadRouters routes={routes}/>
                        </Content>
                        <Footer className="layout-admin__footer">
                            EPICS IEEE
                        </Footer>
                    </Layout>

                </Content>
            </Layout>
        )
    }

    return null;
}

function LoadRouters(props) {
    const { routes } = props;

    return (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    );
}

function getMenuItems() {
    return [
        {
            text: 'Inicio',
            icon: HomeOutlined,
            to: '/home',
        },
        {
            text: 'Colegio',
            icon: BankOutlined,
            to: '/home/school',
        },
        {
            text: 'Director',
            icon: UserOutlined,
            to: '/home/director',
        },
        {
            text: 'Profesores',
            icon: TeamOutlined,
            to: '/home/professors',
        },
        {
            text: 'Cursos',
            icon: BookOutlined,
            to: '/home/courses',
        },
        {
            text: 'Estudiantes',
            icon: SmileOutlined,
            to: '/home/students',
        },
    ]
}
