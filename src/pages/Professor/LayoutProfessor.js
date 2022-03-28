//Librerías
import {useState, useEffect} from 'react';
import { Layout, Row} from 'antd';
import {Route,Switch,Redirect} from 'react-router-dom';

//Componentes
import MenuTop from '../../components/General/MenuTop';
import Breadcrumbs from '../../components/Professor/Breadcrumbs';
import MenuSider from '../../components/Professor/MenuSider/MenuSider';

import ProfessorContext from '../../components/Professor/ProfessorContext'

import professorApi from '../../mock_data/collections/professor.json';

//Hooks
import useAuth from '../../hooks/useAuth';

//Estilos
import './LayoutProfessor.scss';

export default function LayoutProfessor(props){
    const {Header, Content, Footer} = Layout;
    const { routes, location } = props;
    const {username, isLoading} = useAuth();

    const [menuSelectedKey, setMenuSelectedKey] = useState([location.pathname]);
    const [userInfo, setUserInfo] = useState({});
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    
    useEffect(() => {
        const data = professorApi.find(p => p.username == username);
        // if(!data) {
        //     window.location.pathname = '/login';
        //     window.location.reload();
        // }
        const {firstname, lastname, phone, email} = data;
        setUserInfo({firstname, lastname, phone, email});
    }, [])

    if (!username && !isLoading) return <Redirect to="/login"/>;

    if(username && !isLoading){
        if(window.location.pathname == "/") return <Redirect to="/home"/>;
        
        return (
            <ProfessorContext.Provider value={{userInfo, setUserInfo}}>
            
            <Layout className="layout-professor">
                <Header className="layout-professor__header">
                    <MenuTop callback={() => window.location.href = '/home'}/>
                </Header>
                <Content className="layout-professor__content">
                    <Layout>
                        <MenuSider
                            setSelectedKey={setMenuSelectedKey}
                            selectedKey={menuSelectedKey}
                            collapsed={menuCollapsed}
                            setCollapsed={setMenuCollapsed}
                        />
                        <Layout
                            className='layout-professor__content__layout'
                            style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
                        >
                            <Content>
                                <Row>
                                    <Breadcrumbs/>
                                </Row>
                                <div className="layout-professor__content__layout__content">
                                    <LoadRoutes routes={routes}/>
                                </div>
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
