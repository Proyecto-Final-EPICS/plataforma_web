import { useState, useEffect, useContext } from 'react';
import TableCourses from '../../../components/Admin/TableCourses';

import AdminContext from '../../../components/Admin/AdminContext';

import courseApi from '../../../mock_data/collections/course.json';

import './AdminCourses.scss';

export default function AdminCourses(props) {
    const [courses, setCourses] = useState([]);
    const { school, rowSel, setRowSel, addRow, setAddRow, editRow, setEditRow, deleteRow, setDeleteRow } 
        = useContext(AdminContext);

    useEffect(() => {
        if(editRow) {
            
            setEditRow(false);
        }
    }, [editRow]);

    useEffect(() => {
        if(addRow) {
            
            setAddRow(false);
        }
    }, [addRow]);
    
    useEffect(() => {
        if(deleteRow) {
            // setCourses(courses.filter(c => c.code !== rowSel.code))
            const temp = courses;
            temp.splice(temp.findIndex(c => c.code === rowSel.code), 1)
            setCourses(temp);

            setRowSel(null);
            setDeleteRow(false);
        }
    }, [deleteRow]);

    useEffect(() => (
        setCourses(courseApi.filter(c => c.school === school))
    ), []);

    return (
        <div className='admin-courses'>
            <TableCourses 
                courses={courses}
            />
        </div>
    )
}
