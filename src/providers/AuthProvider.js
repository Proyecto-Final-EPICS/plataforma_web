//Liberias
import { useState, createContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

//Api
import { getAccessTokenApi, logout } from '../api/auth';
import userApi from '../mock_data/collections/user.json';

export const AuthContext = createContext();

export default function AuthProvider(props) {
    const { setAuthDone, children } = props; //Children hace referencia a cualquier pagina
    const [user, setUser] = useState({
        userId: NaN,
        username: '',
        userType: null,
        isLoading: false,
        school: ''
    });
    
    useEffect(()=>{
        checkUserLogin(user, setUser);
        setAuthDone(true);
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function checkUserLogin(user, setUser){
    // console.log('checking...');
    const accessToken = getAccessTokenApi();
    
    if(!accessToken){
        console.log("Token caducado o inexistente");//aca debería ir el accesstoken
        logout();

        setUser({
            userId: NaN,
            username: '',
            userType: 'noUser',
            isLoading: false,
            school: '',
        });
    }else{
        // setUser({
        //     ...jwtDecode(accessToken).sub,
        //     isLoading: false,
        // })
        let userType = localStorage.getItem('userType');
        if(!userType || userType==='null') {
            userType = prompt('User type:');
            localStorage.setItem('userType', userType);
        }

        const username = jwtDecode(accessToken).sub.user;
        setUser({
            userId: 0,
            username,
            userType, //admin director professor noUser
            isLoading: false,
            school: userApi.find(u => u.username === username).school,
        });
    }
}
