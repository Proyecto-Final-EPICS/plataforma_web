//Liberias
import React,{useState,createContext,useEffect} from 'react';
import jwtDecode from 'jwt-decode';

//Api
import { getAccessTokenApi, logout } from '../api/auth';

export const AuthContext = createContext();

export default function AuthProvider(props){
    const { children } = props; //Children hace referencia a cualquier pagina
    const [user, setUser] = useState({
        userId: NaN,
        username: '',
        userType: null,
        isLoading: false,
    });
    
    useEffect(()=>{
        checkUserLogin(user, setUser);
    },[]);
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
    //Se está pasando el usuario a toda la web con value={user}
}

function checkUserLogin(user, setUser){
    console.log('checking...');
    const accessToken = getAccessTokenApi();
    
    if(!accessToken){
        console.log("Token caducado o inexistente");//aca debería ir el accesstoken
        logout();
        setUser({
            userId: NaN,
            username: '',
            userType: 'noUser',
            isLoading: false,
        });
    }else{
        // setUser({
        //     ...jwtDecode(accessToken).sub,
        //     isLoading: false,
        // })
        let userType = localStorage.getItem('userType');
        
        if(!userType || userType=='null') {
            userType = prompt('User type:');
            localStorage.setItem('userType', userType);
        }
        setUser({
            userId: 0,
            username: jwtDecode(accessToken).sub.user,
            userType, //professor admin noUser
            isLoading: false,
        });
    }
}