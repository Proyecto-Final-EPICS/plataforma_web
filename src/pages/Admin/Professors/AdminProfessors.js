import { useState, useEffect, useContext } from 'react';
import TableProfessors from '../../../components/Admin/TableProfessors';
import ProfessorForm from '../../../components/Admin/Forms/ProfessorForm';

import AdminContext from '../../../components/Admin/AdminContext';

import { delProfessor, getProfessorsFromSchool } from '../../../api/professor';

import './AdminProfessors.scss';

export default function AdminProfessors(props) {
    const [professors, setProfessors] = useState([]);
    const { school, rowSel, setRowSel, addRow, setAddRow, editRow, setEditRow, deleteRow, setDeleteRow, 
        setModalVisible, setModalContent, setModalTitle } = useContext(AdminContext);
    
    useEffect(() => {
        if(addRow) {
            setModalContent(
                <ProfessorForm
                    professors={professors} 
                    setProfessors={setProfessors} 
                    setModalVisible={setModalVisible}
                    school={school}
                />
            )
            setModalTitle('Registrar Profesor');
            setModalVisible(true);
            setAddRow(false);
        }
    }, [addRow]);
    
    useEffect(() => {
        if(editRow) {
            setModalContent(
                <ProfessorForm
                    professors={professors} 
                    setProfessors={setProfessors} 
                    setModalVisible={setModalVisible}
                    school={school}
                    edit
                    toEdit={professors.find(p => p.username === rowSel.username)}
                    setRowSel={setRowSel}
                />
            );
            setModalTitle('Actualizar Profesor');
            setModalVisible(true);
            setEditRow(false);
        }
    }, [editRow]);
    
    useEffect(() => {
        if(deleteRow) {
            delProfessor(rowSel.username).then(json => setProfessors(json));
            setRowSel(null);
            setDeleteRow(false);
        }
    }, [deleteRow]);

    useEffect(() => (
        getProfessorsFromSchool(school).then(json => setProfessors(json))
    ), []);

    return (
        <div className='admin-professors'>
            <TableProfessors
                professors={professors}
            />
        </div>
    )
}
