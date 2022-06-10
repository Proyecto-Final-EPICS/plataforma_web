import { useState, useEffect, useContext } from 'react';
import TableStudents from '../../../components/Admin/TableStudents';
import StudentForm from '../../../components/Admin/Forms/StudentForm/StudentForm';

import AdminContext from '../../../components/Admin/AdminContext';

import { delStudent, getStudentsFromSchool } from '../../../api/student';

import './AdminStudents.scss';

export default function AdminStudents(props) {
    const [students, setStudents] = useState([]);
    const { school, rowSel, setRowSel, addRow, setAddRow, editRow, setEditRow, deleteRow, setDeleteRow,
        setModalVisible, setModalContent, setModalTitle } = useContext(AdminContext);

    useEffect(() => {
        if(addRow) {
            setModalContent(
                <StudentForm
                    students={students}
                    setStudents={setStudents}
                    setModalVisible={setModalVisible}
                    school={school}
                />)
            setModalTitle('Registrar Estudiante');
            setModalVisible(true);
            setAddRow(false);
        }
    }, [addRow]);

    useEffect(() => {
        if(editRow) {
            setModalContent(
                <StudentForm
                    students={students}
                    setStudents={setStudents}
                    setModalVisible={setModalVisible}
                    school={school}
                    edit
                    toEdit={students.find(s => s.username === rowSel.username)}
                    setRowSel={setRowSel}
                />)
            setModalTitle('Actualizar Estudiante');
            setModalVisible(true);
            setEditRow(false);
        }
    }, [editRow]);

    useEffect(() => {
        if(deleteRow) {
            delStudent(rowSel.username).then(json => setStudents(json));
            setRowSel(null);
            setDeleteRow(false);
        }
    }, [deleteRow]);

    useEffect(() => (
        getStudentsFromSchool(school).then(json => setStudents(json))
    ), []);

    return (
        <div className='admin-students'>
            <TableStudents 
                students={students}
            />
        </div>
    )
}
