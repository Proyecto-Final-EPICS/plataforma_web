import {Redirect} from 'react-router-dom';

import './Error.scss';
// import { getAccessTokenApi } from '../api/auth';

import useAuth from '../hooks/useAuth';

export default function Error404(){
    const {userType} = useAuth();

    if(userType == 'noUser') return <Redirect to="/login"/>;

    return (
        <div className='error-page'>
            <h1>Error 404: Not Found</h1>   
        </div>
    );
}