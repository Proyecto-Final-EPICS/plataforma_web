import { useState, useEffect, useContext } from 'react';
import TableProfessors from '../../../components/Admin/TableProfessors';

import AdminContext from '../../../components/Admin/AdminContext';

import userApi from '../../../mock_data/collections/user.json';

import './AdminProfessors.scss';

export default function AdminProfessors(props) {
    const [professors, setProfessors] = useState([]);
    const { school } = useContext(AdminContext);

    useEffect(() => (
        setProfessors(userApi.filter(u => u.school.code === school && u.role === 'professor'))
    ), []);

    return (
        <div className='admin-professors'>
            <TableProfessors
                professors={professors}
            />
        </div>
    )
}
