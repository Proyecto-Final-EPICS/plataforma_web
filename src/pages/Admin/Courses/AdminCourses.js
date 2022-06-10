import { useState, useEffect, useContext } from 'react';
import TableCourses from '../../../components/Admin/TableCourses';
import CourseForm from '../../../components/Admin/Forms/CourseForm';

import AdminContext from '../../../components/Admin/AdminContext';

import { delCourse, getCoursesFromSchool } from '../../../api/course';

import './AdminCourses.scss';

export default function AdminCourses(props) {
    const [courses, setCourses] = useState([]);
    const { school, rowSel, setRowSel, addRow, setAddRow, editRow, setEditRow, deleteRow, setDeleteRow, 
        setModalVisible, setModalContent, setModalTitle } = useContext(AdminContext);
    
    useEffect(() => {
        if(addRow) {
            setModalContent(
                <CourseForm
                    courses={courses} 
                    setCourses={setCourses} 
                    setModalVisible={setModalVisible}
                    school={school}
                />
            )
            setModalTitle('Registrar Curso');
            setModalVisible(true);
            setAddRow(false);
        }
    }, [addRow]);
    
    useEffect(() => {
        if(editRow) {
            setModalContent(
                <CourseForm
                    courses={courses} 
                    setCourses={setCourses} 
                    setModalVisible={setModalVisible}
                    school={school}
                    edit
                    toEdit={courses.find(c => c.code === rowSel.code)}
                    setRowSel={setRowSel}
                />
            );
            setModalTitle('Actualizar Curso');
            setModalVisible(true);
            setEditRow(false);
        }
    }, [editRow]);
    
    useEffect(() => {
        if(deleteRow) {
            delCourse(school, rowSel.code).then(json => setCourses(json));
            setRowSel(null);
            setDeleteRow(false);
        }
    }, [deleteRow]);

    useEffect(() => (
        getCoursesFromSchool(school).then(json => setCourses(json))
    ), []);

    return (
        <div className='admin-courses'>
            <TableCourses courses={courses}/>
        </div>
    )
}
