//Liberias
import { useState, createContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

//Api
import { getAccessTokenApi, logout } from '../api/auth';

export const AuthContext = createContext();

export default function AuthProvider(props) {
    const { setAuthDone, children } = props; //Children hace referencia a cualquier pagina
    const [user, setUser] = useState({});
    
    useEffect(()=>{
        checkUserLogin(setUser);
        setAuthDone(true);
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function checkUserLogin(setUser){
    const accessToken = getAccessTokenApi();
    
    if(!accessToken){
        console.log("Token caducado o inexistente");//aca debería ir el accesstoken
        logout();
    }else{
        setUser(jwtDecode(accessToken).sub);
    }
}
