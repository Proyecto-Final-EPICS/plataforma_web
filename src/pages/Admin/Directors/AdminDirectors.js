import { useState, useEffect, useContext } from 'react';
import TableDirectors from '../../../components/Admin/TableDirectors';

import AdminContext from '../../../components/Admin/AdminContext';

import userApi from '../../../mock_data/collections/user.json';

import './AdminDirectors.scss';

export default function AdminDirectors(props) {
    const [directors, setDirectors] = useState([]);
    const { school } = useContext(AdminContext);

    useEffect(() => (
        setDirectors(userApi.filter(u => u.school.code === school && u.role === 'director'))
    ), []);

    return (
        <div className='admin-directors'>
            <TableDirectors 
                directors={directors}
            />
        </div>
    )
}
