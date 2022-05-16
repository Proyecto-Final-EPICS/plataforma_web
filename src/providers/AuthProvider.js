//Liberias
import { useState, createContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

//Api
import { getAccessTokenApi, logout } from '../api/auth';
import userApi from '../mock_data/collections/user.json';
import adminApi from '../mock_data/collections/admin.json';

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
        const username = jwtDecode(accessToken).sub.user;
        let user = userApi.find(u => u.username === username);
        setUser(user ? user : adminApi.username === username ? adminApi : {});
    }
}
