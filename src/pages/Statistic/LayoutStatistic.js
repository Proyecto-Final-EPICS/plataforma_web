import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

//Componentes
import MenuTop from '../../components/Statistic/MenuTop';

//Estilos
import './LayoutStatistic.scss';

export default function LayoutStatistic(props) {
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    
    return (
        <Layout className="layout-statistic">
            <Header className="layout-statistic__header">
                <MenuTop/>
            </Header>
            <Content>
                <LoadRoutes routes={routes}/>
            </Content>
            <Footer style={{textAlign:'center'}} className="layout-statistic__footer">
                <span> &copy; EPICS IEEE</span>
            </Footer>
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
                    render={props => <route.component {...props} routes={routes}/>}
                />
            ))}
        </Switch>
    );
}
