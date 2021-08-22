//Este hook devolverá todos los datos que están en el token

//Liberias
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export default () => useContext(AuthContext);