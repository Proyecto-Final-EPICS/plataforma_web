//Liberias
import { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "antd/dist/antd.css";

//Fichero de configuración de rutas
import routes from './config/routes';

//Hooks
import AuthProvider from './providers/AuthProvider';
import useAuth from './hooks/useAuth';

//Estilos
import './App.scss';

function App(){
  return (
    //Siempre se va a utilizar el AuthProvider, comprobar si el user esta logeado
    <AuthProvider>
      <Router>
        <SwitchRoute routes={routes}/>
      </Router>
    </AuthProvider>
  );
}

function SwitchRoute(props) {
  const {routes} = props;
  
  // console.log(useAuth().userType || 'noUser');
  // console.log(routes[useAuth().userType || 'noUser']);

  // const {userType, setUserType} = useEffect('noUser');

  // useEffect(() => {
  //   // setUserType()
  // }, []);

  return (
    <Switch>
      {routes[useAuth().userType || 'noUser'].map((route, index) => (
        <RouteWithSubRoutes key={index} {...route}/>
      ))}
    </Switch>
  )
}

//Renderiza ruta padre y pasa rutas hijas al componente
function RouteWithSubRoutes(route){
  return (
    <Route
      path = {route.path}
      exact = {route.exact}
      render = {props=><route.component routes={route.routes} {...props}/>}/*Se usa render porque va a renderizar otras rutas*/ 
    />
  );
}

export default App;
