//Liberías
import React, { useState } from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import AdminContext from '../../components/Admin/AdminContext';

//Componentes
import MenuTop from '../../components/General/MenuTop';
import MenuSider from '../../components/Admin/MenuSider';

//Hooks
import useAuth from '../../hooks/useAuth';

//Estilos
import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    const { routes, location } = props;
    const { Header, Content, Footer } = Layout;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const [menuSelectedKey, setMenuSelectedKey] = useState([location.pathname]);

    const {username, isLoading} = useAuth();

    if(!username && !isLoading) return <Redirect to="/login"/>;

    if(username && !isLoading) {
        if(window.location.pathname == "/") return <Redirect to="/home"/>;
        return (
            <AdminContext.Provider value={{
                setMenuSelectedKey,
            }}>
            
            <Layout className="layout-admin">
                <Content>
                    <Header className="layout-admin__header">
                        {/* <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} /> */}
                        <MenuTop callback={() => setMenuCollapsed(!menuCollapsed)}/>
                    </Header>
                    <MenuSider 
                        menuCollapsed={menuCollapsed} 
                        setSelectedKey={setMenuSelectedKey}
                        selectedKey={menuSelectedKey}
                        // className="menu-sider"
                    />
                    <Layout className="layout-admin__layout" style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}>
                        <Content className="layout-admin__layout__content">
                            <LoadRouters routes={routes}/>
                        </Content>
                        <Footer className="layout-admin__footer">
                            EPICS IEEE
                        </Footer>
                    </Layout>
                </Content>
            </Layout>
            </AdminContext.Provider>
        );
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