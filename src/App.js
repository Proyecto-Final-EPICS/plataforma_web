//Liberias
import { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "antd/dist/antd.css";

//Fichero de configuración de rutas
import routes from './config/routes';

//Hooks
import AuthProvider from './providers/AuthProvider';
import useAuth from './hooks/useAuth';

// import { helloApi } from './api/web';

//Estilos
import './App.scss';

function App(){
  const [authDone, setAuthDone] = useState(false);

  // helloApi().then(json => console.log(json));

  return (
    //Siempre se va a utilizar el AuthProvider, comprobar si el user esta logeado
    <AuthProvider setAuthDone={setAuthDone}>
      <Router>
        {authDone?
          <SwitchRoute routes={routes}/>
          :null
        }
      </Router>
    </AuthProvider>
  );
}

function SwitchRoute(props) {
  const { routes } = props;
  const { role } = useAuth();
  console.log(role);

  return (
    <Switch>
      {routes[role || 'noUser'].map((route, index) => (
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
