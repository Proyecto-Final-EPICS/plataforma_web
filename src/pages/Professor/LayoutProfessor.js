//Librerías
import { useState, useEffect } from 'react';
import { Layout, Row } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';

//Componentes
import MenuTop from '../../components/General/MenuTop';
import Breadcrumbs from '../../components/Professor/Breadcrumbs';
import MenuSider from '../../components/Professor/MenuSider/MenuSider';

import ProfessorContext from '../../components/Professor/ProfessorContext'

import useAuth from '../../hooks/useAuth';

import professorApi from '../../mock_data/collections/professor.json';

//Estilos
import './LayoutProfessor.scss';

export default function LayoutProfessor(props){
    const getMenuSelectedKey = () => '/' + window.location.pathname.split('/')[1];

    const { Sider, Header, Content, Footer } = Layout;
    const { routes } = props;
    const { username, isLoading } = useAuth();

    const [menuSelectedKey, setMenuSelectedKey] = useState(getMenuSelectedKey());
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    (() => {
        const k = getMenuSelectedKey();
        if(menuSelectedKey !== k) setMenuSelectedKey(k);
    })();

    useEffect(() => {
        const { firstname, lastname, phone, email, school } = professorApi.find(p => p.username == username);
        setUserInfo({username, firstname, lastname, phone, email, school});
    }, []);

    if(!username && !isLoading) return <Redirect to="/login"/>;

    if(username && !isLoading) {
        if(window.location.pathname == "/") return <Redirect to="/home"/>;
        
        return (
            <ProfessorContext.Provider value={{userInfo, setUserInfo}}>
            
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
                        <Layout
                            style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
                        >
                            <Breadcrumbs/>
                            <Content className='layout-professor__content'>
                                <LoadRoutes routes={routes}/>
                            </Content>
                        </Layout>
                    </Layout>
                </Content>
                <Footer style={{textAlign:'center'}}className="layout-professor__footer">
                    <span> &copy; EPICS IEEE</span>
                </Footer>
            </Layout>

            </ProfessorContext.Provider>
        );
    }
    
    return null;
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
