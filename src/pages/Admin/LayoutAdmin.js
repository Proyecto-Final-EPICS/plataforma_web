import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch, matchPath } from 'react-router-dom';

import {
    HomeOutlined, UserOutlined, TeamOutlined, BookOutlined, BankOutlined, SmileOutlined
} from '@ant-design/icons';

import useAuth from '../../hooks/useAuth';
import AdminContext from '../../components/Admin/AdminContext';

import MenuSider from './../../components/Admin/MenuSider';
import MenuTop from '../../components/Admin/MenuTop';

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    console.log('layoooout');
    const { routes } = props;
    
    const { Sider, Header, Content, Footer } = Layout;

    const [menuSelectedKey, setMenuSelectedKey] = useState(window.location.pathname);
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const [rowSel, setRowSel] = useState(-1);
    const [search, setSearch] = useState('');
    const [school, setSchool] = useState('');
    const [menuItems, setMenuItems] = useState([]);

    const { username, isLoading } = useAuth();

    const collectionSelected = () => {
        const selItem = menuItems.find(i => i.to === menuSelectedKey);
        return selItem && selItem.isCollection;
    }

    const getSchool = () => {
        const matchSchool = matchPath(window.location.pathname, { path: '/schools/:school' });
        return matchSchool && matchSchool.params.school;
    }

    (() => {
        const s2 = getSchool();
        if(school !== s2) setSchool(s2);
        // if(rowSel !== -1) setRowSel(-1);
    })();
    
    const updateMenuItems = () => setMenuItems(getMenuItems(school));

    useEffect(updateMenuItems, []);
    useEffect(updateMenuItems, [school])

    if(!username && !isLoading) return <Redirect to="/login"/>;

    if(username && !isLoading) {
        if(window.location.pathname == "/") return <Redirect to="/home"/>;
        return (
            <AdminContext.Provider value={{
                setRowSel, school
            }}>
            <Layout className='layout-admin'>
                <Sider className='layout-admin__sider' collapsed={menuCollapsed}>
                    <div
                        // key="/home/epics"
                        onClick={() => setMenuCollapsed(!menuCollapsed)}
                        className="layout-admin__sider__logo"
                    >
                        <h1>{menuCollapsed ? "EI" : "EPICS IEEE"}</h1>
                    </div>
                    <MenuSider
                        selectedKey={menuSelectedKey}
                        setSelectedKey={setMenuSelectedKey}
                        items={menuItems}
                    />
                </Sider> 
                <Content>
                    <Layout>
                        <Header className='layout-admin__header'>
                            <MenuTop
                                rowSel={rowSel}
                                setRowSel={setRowSel}
                                collectionSelected={collectionSelected()}
                            />
                        </Header>
                        <Content className="layout-admin__content">
                            <LoadRouters routes={routes}/>
                        </Content>
                        <Footer className="layout-admin__footer">
                            EPICS IEEE
                        </Footer>
                    </Layout>

                </Content>
            </Layout>
            </AdminContext.Provider>
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

function getMenuItems(school) {
    // console.log('school: ',school);
    if(!school) return [
        {
            text: 'Inicio',
            icon: HomeOutlined,
            to: '/home',
            isCollection: false,
        },
        {
            text: 'Colegios',
            icon: BankOutlined,
            to: '/schools',
            isCollection: true,
        },
    ]

    return [
        {
            text: 'Colegio',
            icon: BankOutlined,
            to: `/schools/${school}`,
            isCollection: false,
        },
        {
            text: 'Directores',
            icon: UserOutlined,
            to: `/schools/${school}/directors`,
            isCollection: true,
        },
        {
            text: 'Profesores',
            icon: TeamOutlined,
            to: `/schools/${school}/professors`,
            isCollection: true,
        },
        {
            text: 'Cursos',
            icon: BookOutlined,
            to: `/schools/${school}/courses`,
            isCollection: true,
        },
        {
            text: 'Estudiantes',
            icon: SmileOutlined,
            to: `/schools/${school}/students`,
            isCollection: true,
        },
    ]
}
