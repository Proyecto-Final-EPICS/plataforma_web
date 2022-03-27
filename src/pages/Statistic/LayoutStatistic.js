import {Layout} from 'antd';
import {Route, Switch, Redirect} from 'react-router-dom';

//Componentes
import MenuTop from '../../components/Statistic/MenuTop';
import Breadcrumbs from '../../components/Statistic/Breadcrumbs';

//Paginas
import Login from '../../pages/Login';

//Hooks
import useAuth from '../../hooks/useAuth';

//Estilos
import './LayoutStatistic.scss';

//...
const {Header, Sider, Content, Footer} = Layout;

export default function LayoutStatistic(props){
    const {routes} = props;
    const {username, isLoading} = useAuth();

    if (!username && !isLoading) {//No hay usuario logeado
        return(
            <>
            <Route path="/login" component={Login}/>
            <Redirect to="/login"/>
            </>
        )
    }

    if(username && !isLoading){//Usuario logeado
        return(
            <Layout className="layout-statistic">
                <Header className="layout-statistic__header">
                    <MenuTop/>
                </Header>
                <Content className="layout-statistic__c">
                    <div className="layout-statistic__content">
                        <LoadRoutes routes={routes}/>
                    </div>
                </Content>
                <Footer style={{textAlign:'center'}} className="layout-statistic__footer">
                    <span> &copy; EPICS IEEE</span>
                </Footer>
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
                    render={props => <route.component {...props} routes={routes}/>}
                />
            ))}
        </Switch>
    );
}
