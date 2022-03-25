//Liberias
import jwtDecode from 'jwt-decode';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "antd/dist/antd.css";

//Fichero de configuración de rutas
import routes from './config/routes';

//Hooks
import AuthProvider from './providers/AuthProvider';

//Constantes
import {ACCESS_TOKEN} from './utils/constants';

//Estilos
import './App.scss';


function App(){
  const token = localStorage.getItem(ACCESS_TOKEN);
  let userType;
  if(token !== null && token !== 'none') {
    // const userType = token.sub.userType;
    userType = 'professor';
  } else userType = 'noUser';

  return(
    //Siempre se va a utilizar el AuthProvider, comprobar si el user esta logeado
    <AuthProvider>
      <Router>
        <Switch>
          {routes[userType].map((route,index)=>(
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
