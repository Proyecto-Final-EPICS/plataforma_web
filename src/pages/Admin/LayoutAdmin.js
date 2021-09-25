//Liberías
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';


//Componentes
import MenuTop from '../../components/Admin/MenuTop';
import MenuSider from '../../components/Admin/MenuSider';

//Paginas
import Login from '../../pages/Login';

//Hooks
import useAuth from '../../hooks/useAuth';

//Estilos
import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    const { routes, location } = props;
    const { Header, Content, Footer } = Layout;
    const [menuCollapsed, setMenuCollapsed] = useState(false); //Para desplegar el menu
    const [menuSelectedKey, setMenuSelectedKey] = useState([location.pathname]);
    
    const {user, isLoading} = useAuth();

    if (!user && !isLoading) {//No hay usuario logeado
        return(
            <>
                <Route path="/" component={Login}/>
                <Redirect to="/"/>
            </>
        )
    }

    return (
        <Layout>
            <Content>
                <MenuSider 
                    menuCollapsed={menuCollapsed} 
                    setSelectedKey={setMenuSelectedKey}
                    selectedKey={menuSelectedKey}
                    className="menu-sider"
                />
                <Layout className="layout-admin" style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}>                    
                    <Content className="layout-admin__content">
                        <LoadRouters routes={routes} setMenuSelectedKey={setMenuSelectedKey}/>
                    </Content>
                    <Footer style={{ textAlign: 'center' }} className="layout-basic__footer">
                        EPICS IEEE
                    </Footer>
                </Layout>
                <Header className="layout-admin__header">
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                </Header>
            </Content>
        </Layout>


    );
}

function LoadRouters(props) {
    const { routes, setMenuSelectedKey } = props;

    return (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={
                        props=>(
                            <route.component 
                                {...props}
                                setMenuSelectedKey={setMenuSelectedKey}
                            />
                        )
                    }/*Se usa render porque va a renderizar otras rutas*/ 
                    // component={route.component}
                />
            ))}
        </Switch>
    );

}