import { useState, useEffect, useContext } from 'react';
import TableCourses from '../../../components/Admin/TableCourses';

import AdminContext from '../../../components/Admin/AdminContext';

import courseApi from '../../../mock_data/collections/course.json';

import './AdminCourses.scss';

export default function AdminCourses(props) {
    const [courses, setCourses] = useState([]);
    const { school } = useContext(AdminContext);

    useEffect(() => (
        setCourses(courseApi.filter(c => c.school.code === school))
    ), []);

    return (
        <div className='admin-courses'>
            <TableCourses 
                courses={courses}
            />
        </div>
    )
}
