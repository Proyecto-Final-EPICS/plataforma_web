//Liberías
import { useState } from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

import DirectorContext from '../../components/Director/DirectorContext';

//Componentes
import MenuTop from '../../components/General/MenuTop';
import MenuSider from '../../components/Director/MenuSider';
import Breadcrumbs from '../../components/General/Breadcrumbs';

//Estilos
import "./LayoutDirector.scss";

export default function LayoutDirector(props) {
    const getMenuSelectedKey = () => '/' + window.location.pathname.split('/')[1];

    const { Header, Sider, Content, Footer } = Layout;
    const { routes } = props;

    const [menuSelectedKey, setMenuSelectedKey] = useState(getMenuSelectedKey());
    const [menuCollapsed, setMenuCollapsed] = useState(false);

    (() => {
        const k = getMenuSelectedKey();
        if(menuSelectedKey !== k) setMenuSelectedKey(k);
    })();

    return (
        <DirectorContext.Provider value={{
            setMenuSelectedKey,
        }}>
        
        <Layout className="layout-director">
            <Header className="layout-director__header">
                <MenuTop callback={() => setMenuCollapsed(!menuCollapsed)}/>
            </Header>
            <Content>
                <Layout>
                    <Sider className="layout-director__sider" collapsed={menuCollapsed}>
                        <div
                            onClick={() => setMenuCollapsed(!menuCollapsed)}
                            className="layout-director__sider__logo"
                        >
                            {menuCollapsed ? "EI" : "EPICS IEEE"}
                        </div>
                        <MenuSider 
                            menuCollapsed={menuCollapsed} 
                            setSelectedKey={setMenuSelectedKey}
                            selectedKey={menuSelectedKey}
                        />
                    </Sider>
                    <Layout style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}>
                        <Breadcrumbs />
                        
                        <Content className="layout-director__content">
                            <LoadRouters routes={routes}/>
                        </Content>
                        
                        <Footer className="layout-director__footer">
                            <span> &copy; EPICS IEEE</span>
                        </Footer>
                    </Layout>
                </Layout>
            </Content>
        </Layout>
        </DirectorContext.Provider>
    );
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
