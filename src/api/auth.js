//Configuraciones
import { ACCESS_TOKEN } from '../utils/constants';

//Liberias
import jwtDecode from 'jwt-decode';

export function getAccessTokenApi(){
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if(!accessToken || accessToken == 'none') return null;

    try {
        return willExpireToken(jwtDecode(accessToken).exp) ? null : accessToken; //Retorna null si venció, sino retorna el token
    }catch(e) {
        return null;
    }
}

function willExpireToken(exp){
    const seconds = 60;
    const now = Date.now() / 1000 + seconds;
    return now > exp;
}

export function logout(){
    localStorage.removeItem(ACCESS_TOKEN);
}
