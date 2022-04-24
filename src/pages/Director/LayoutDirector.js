//Liberías
import { useState } from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import DirectorContext from '../../components/Director/DirectorContext';

//Componentes
import MenuTop from '../../components/General/MenuTop';
import MenuSider from '../../components/Director/MenuSider';

//Hooks
import useAuth from '../../hooks/useAuth';

//Estilos
import "./LayoutDirector.scss";

export default function LayoutDirector(props) {
    console.log('lay director')
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const [menuSelectedKey, setMenuSelectedKey] = useState(window.location.pathname);
    
    const { Header, Content, Footer } = Layout;
    
    const {username, isLoading} = useAuth();

    if(!username && !isLoading) return <Redirect to="/login"/>;

    if(username && !isLoading) {
        if(window.location.pathname == "/") return <Redirect to="/home"/>;
        return (
            <DirectorContext.Provider value={{
                setMenuSelectedKey,
            }}>
            
            <Layout className="layout-director">
                <Content>
                    <Header className="layout-director__header">
                        {/* <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} /> */}
                        <MenuTop callback={() => setMenuCollapsed(!menuCollapsed)}/>
                    </Header>
                    <MenuSider 
                        menuCollapsed={menuCollapsed} 
                        setSelectedKey={setMenuSelectedKey}
                        selectedKey={menuSelectedKey}
                        // className="menu-sider"
                    />
                    <Layout className="layout-director__layout" style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}>
                        <Content className="layout-director__layout__content">
                            <LoadRouters routes={routes}/>
                        </Content>
                        <Footer className="layout-director__footer">
                            EPICS IEEE
                        </Footer>
                    </Layout>
                </Content>
            </Layout>
            </DirectorContext.Provider>
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
