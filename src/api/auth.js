//Configuraciones
import {ACCESS_TOKEN} from '../utils/constants';

//Liberias
import jwtDecode from 'jwt-decode';

export function getAccessTokenApi(){
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if(!accessToken || accessToken === "null"){
        return null;//No hay access token
    }else{
        return willExpireToken(accessToken) ? null : accessToken; //Retorna null si venció, sino retorna el token
    } 
}

function willExpireToken(token){
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;
    const now = (Date.now() + seconds) / 1000;
    return now>exp;
}


export function logout(){
    localStorage.removeItem(ACCESS_TOKEN);
}