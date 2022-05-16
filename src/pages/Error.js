import {Redirect} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import './Error.scss';

export default function Error404(){
    if(!useAuth().username) return <Redirect to="/login"/>;

    return (
        <div className='error-page'>
            <h1>Error 404: Not Found</h1>   
        </div>
    );
}