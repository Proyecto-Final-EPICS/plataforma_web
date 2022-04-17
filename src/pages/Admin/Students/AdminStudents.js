import { useState, useEffect, useContext } from 'react';
import TableStudents from '../../../components/Admin/TableStudents';

import AdminContext from '../../../components/Admin/AdminContext';

import studentApi from '../../../mock_data/collections/student.json';

import './AdminStudents.scss';

export default function AdminStudents(props) {
    const [students, setStudents] = useState([]);
    const { school } = useContext(AdminContext);

    useEffect(() => (
        setStudents(studentApi.filter(s => s.school.code === school))
    ), []);

    return (
        <div className='admin-students'>
            <TableStudents 
                students={students}
            />
        </div>
    )
}
