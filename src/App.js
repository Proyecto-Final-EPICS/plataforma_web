//Liberias
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "antd/dist/antd.css";

//Fichero de configuración de rutas
import routes from './config/routes';

//Hooks
import AuthProvider from './providers/AuthProvider';

//Estilos
import './App.scss';

// import Home from './pages/Home';

function App(){
  return(
    //Siempre se va a utilizar el AuthProvider, comprobar si el user esta logeado
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route,index)=>(
            <RouteWithSubRoutes key={index} {...route}/>
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
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
