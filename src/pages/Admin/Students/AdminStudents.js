import { useState, useEffect, useContext } from 'react';
import TableStudents from '../../../components/Admin/TableStudents';

import AdminContext from '../../../components/Admin/AdminContext';

import studentApi from '../../../mock_data/collections/student.json';

import './AdminStudents.scss';

export default function AdminStudents(props) {
    const [students, setStudents] = useState([]);
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
            // setStudents(students.filter(s => s.username !== rowSel.username))
            const temp = students;
            temp.splice(temp.findIndex(s => s.username === rowSel.username), 1)
            setStudents(temp);

            setRowSel(null);
            setDeleteRow(false);
        }
    }, [deleteRow]);

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
