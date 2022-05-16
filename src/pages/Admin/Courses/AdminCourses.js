import { useState, useEffect, useContext } from 'react';
import TableCourses from '../../../components/Admin/TableCourses';
import CourseForm from '../../../components/Admin/Forms/CourseForm';

import AdminContext from '../../../components/Admin/AdminContext';

import courseApi from '../../../mock_data/collections/course.json';

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
                    edit
                    toEdit={courses.find(c => c.code === rowSel.code)}
                />
            );
            setModalTitle('Actualizar Curso');
            setModalVisible(true);
            setEditRow(false);
        }
    }, [editRow]);
    
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
            <TableCourses courses={courses}/>
        </div>
    )
}
