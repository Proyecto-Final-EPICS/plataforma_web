//Liberias
import React,{useState,createContext,useEffect} from 'react';
import jwtDecode from 'jwt-decode';

//Api
import { getAccessTokenApi, logout } from '../api/auth';

export const AuthContext = createContext();

export default function AuthProvider(props){
    const { children } = props; //Children hace referencia a cualquier pagina
    const [user, setUser] = useState({
        // user: null,//No logeado
        // isLoading: true //Está cargando
        user: 'Prueba',
        isLoading: false
    });
    
    useEffect(()=>{
        checkUserLogin(setUser);
    },[]);
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
    //Se está pasando el usuario a toda la web con value={user}
}

function checkUserLogin(setUser){
    // setUser({
    //     user: 'xd',
    //     isLoading: false,
    // })
    // return;
    const accessToken = getAccessTokenApi();

    if(!accessToken){
        console.log("Token caducado o no existe");//aca debería ir el accesstoken
        logout();
        setUser({
            user: null,
            isLoading: false
        });
    }else{
        setUser({
            isLoading: false,
            user: jwtDecode(accessToken).sub //Acá se saca el usuario del token
        });
    }
}