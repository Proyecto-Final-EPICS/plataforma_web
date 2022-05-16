//Librerías
import { useState } from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

//Componentes
import MenuTop from '../../components/General/MenuTop';
import Breadcrumbs from '../../components/General/Breadcrumbs';
import MenuSider from '../../components/Professor/MenuSider/MenuSider';

//Estilos
import './LayoutProfessor.scss';

export default function LayoutProfessor(props) {
    const getMenuSelectedKey = () => '/' + window.location.pathname.split('/')[1];

    const { Sider, Header, Content, Footer } = Layout;
    const { routes } = props;

    const [menuSelectedKey, setMenuSelectedKey] = useState(getMenuSelectedKey());
    const [menuCollapsed, setMenuCollapsed] = useState(false);

    (() => {
        const k = getMenuSelectedKey();
        if(menuSelectedKey !== k) setMenuSelectedKey(k);
    })();

    return (
        <Layout className="layout-professor">
            <Header className="layout-professor__header">
                <MenuTop callback={() => window.location.href = '/home'}/>
            </Header>
            <Content>
                <Layout>
                    <Sider className='layout-professor__sider' collapsed={menuCollapsed}>
                        <div
                            onClick={() => setMenuCollapsed(!menuCollapsed)}
                            className="layout-professor__sider__logo"
                        >
                            {menuCollapsed ? "EI" : "EPICS IEEE"}
                        </div>
                        <MenuSider
                            selectedKey={menuSelectedKey}
                            setSelectedKey={setMenuSelectedKey}
                        />
                    </Sider>
                    <Layout style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}>
                        <Breadcrumbs/>

                        <Content className='layout-professor__content'>
                            <LoadRoutes routes={routes}/>
                        </Content>

                        <Footer className="layout-professor__footer">
                            <span> &copy; EPICS IEEE</span>
                        </Footer>
                    </Layout>
                </Layout>
            </Content>
        </Layout>
    );
}

function LoadRoutes({routes}){
    return(
        <Switch>
            {routes.map((route,index)=>(
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    //component={route.component}
                    render={props => <route.component {...props} routes={routes}/>}
                />
            ))}
        </Switch>
    );
}
