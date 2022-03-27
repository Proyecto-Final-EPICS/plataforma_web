import {Redirect, Route} from 'react-router-dom';

import Login from './Login';

import './Error.scss';
// import { getAccessTokenApi } from '../api/auth';

import useAuth from '../hooks/useAuth';

export default function Error404(){
    const {userType} = useAuth();

    if(userType == 'noUser') {
        console.log('error (not logged in)');
        return (
            <>
                <Route path="/login" component={Login}/>
                <Redirect to="/login"/>
            </>
        )
    }

    return (
        <div className='error-page'>
            <h1>Error 404: Not Found</h1>   
        </div>
    );
}