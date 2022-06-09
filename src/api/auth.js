//Configuraciones
import {ACCESS_TOKEN} from '../utils/constants';

//Liberias
import jwtDecode from 'jwt-decode';

export function getAccessTokenApi(){
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if(!accessToken) return null;

    let decToken;
    try {
        decToken = jwtDecode(accessToken);
    }catch(e) {return null}

    return willExpireToken(decToken.exp) ? null : accessToken; //Retorna null si venció, sino retorna el token
}

function willExpireToken(exp){
    const seconds = 60;
    const now = Date.now() / 1000 + seconds;
    return now > exp;
}

export function logout(){
    localStorage.removeItem(ACCESS_TOKEN);
}
