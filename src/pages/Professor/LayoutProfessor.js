//Librerías
import React from 'react';
import { Layout, Row} from 'antd';
import {Route,Switch,Redirect} from 'react-router-dom';

//Componentes
import MenuTop from '../../components/General/MenuTop';
import Breadcrumbs from '../../components/Professor/Breadcrumbs';

//Paginas
import Login from '../../pages/Login';

//Hooks
import useAuth from '../../hooks/useAuth';

//Estilos
import './LayoutProfessor.scss';

export default function LayoutProfessor(props){
    const {Header,Content,Footer} = Layout;
    const { routes } = props;
    const {username, isLoading} = useAuth();
    
    console.log('LayProf');
    if (!username && !isLoading){
        return(
            <>
            {/* <Route path="/login" component={Login}/> */}
            <Redirect to="/login"/>
            </>
        )
    }

    if(username && !isLoading){//Usuario logeado
        console.log('LayProf logged in');
        if(window.location.pathname == "/") return <Redirect to="/home"/>;
        return (
            <Layout>
                <Layout className="layout-professor">
                    <Header className="layout-professor__header">
                        <MenuTop callback={() => window.location.href = '/home'}/>
                    </Header>
                    <Content className="layout-professor__c">
                        <Row> 
                            <Breadcrumbs/>
                        </Row>
                        <div className="layout-professor__content">
                            <LoadRoutes routes={routes}/>
                        </div>
                    </Content>
                    <Footer style={{textAlign:'center'}}className="layout-professor__footer">
                        <span> &copy; EPICS IEEE</span>
                    </Footer>
                </Layout>
            </Layout>
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
