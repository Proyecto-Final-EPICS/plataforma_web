import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Link, Route, Switch, matchPath } from 'react-router-dom';

import {
    HomeOutlined, UserOutlined, TeamOutlined, BookOutlined, BankOutlined, SmileOutlined, LeftOutlined
} from '@ant-design/icons';

import MenuSider from './../../components/Admin/MenuSider';
import MenuTop from '../../components/Admin/MenuTop';
import Modal from '../../components/General/Modal';

import AdminContext from '../../components/Admin/AdminContext';

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    // console.log('layoooout');
    const { routes } = props;
    const { Sider, Header, Content, Footer } = Layout;

    const [menuSelectedKey, setMenuSelectedKey] = useState(window.location.pathname);
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const [rowSel, setRowSel] = useState(null);
    const [search, setSearch] = useState('');
    const [school, setSchool] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [addRow, setAddRow] = useState(false);
    const [editRow, setEditRow] = useState(false);
    const [deleteRow, setDeleteRow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    const collectionSelected = () => {
        const selItem = menuItems.find(i => i.to === menuSelectedKey);
        return selItem && selItem.isCollection;
    }

    const getSchool = () => {
        const matchSchool = matchPath(window.location.pathname, { path: '/schools/:school' });
        return matchSchool && matchSchool.params.school;
    }

    const updateMenuItems = () => setMenuItems(getMenuItems(school));
    const updateMenuSelectedKey = () => setMenuSelectedKey(window.location.pathname);

    (() => {
        const s2 = getSchool();
        if(school !== s2) setSchool(s2);
        if(menuSelectedKey !== window.location.pathname) updateMenuSelectedKey();
    })();

    useEffect(updateMenuItems, [school])
    useEffect(() => {
        if(!modalVisible) {
            setModalContent(null);
        }
    }, [modalVisible]);

    return (
        <AdminContext.Provider value={{
            rowSel, setRowSel, school, search, setSearch, deleteRow, setDeleteRow, 
            editRow, setEditRow, addRow, setAddRow, modalVisible, setModalVisible, 
            modalContent, setModalContent, modalTitle, setModalTitle, 
        }}>
        <Layout className='layout-admin'>
            <Sider className='layout-admin__sider' collapsed={menuCollapsed}>
                <div className='layout-admin__sider__head'>

                    {school && !menuCollapsed && 
                    <Link to='/schools' className='layout-admin__sider__head__back'>
                        <div><LeftOutlined/></div>
                    </Link>}
                    
                    <div
                        onClick={() => setMenuCollapsed(!menuCollapsed)}
                        className="layout-admin__sider__head__logo"
                    >
                        <h1>{menuCollapsed ? "EI" : "EPICS IEEE"}</h1>
                    </div>
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
                        <MenuTop collectionSelected={collectionSelected()}/>
                    </Header>
                    <Content className="layout-admin__content">

                        <Modal
                            className='admin-modal'
                            isVisible={modalVisible}
                            setIsVisible={setModalVisible}
                            title={modalTitle}
                        >
                            {modalContent}
                        </Modal>
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
