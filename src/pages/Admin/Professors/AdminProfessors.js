import { useState, useEffect, useContext } from 'react';
import TableProfessors from '../../../components/Admin/TableProfessors';
import ProfessorForm from '../../../components/Admin/Forms/ProfessorForm';

import AdminContext from '../../../components/Admin/AdminContext';

import professorApi from '../../../mock_data/collections/professor.json';

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
                />
            );
            setModalTitle('Actualizar Profesor');
            setModalVisible(true);
            setEditRow(false);
        }
    }, [editRow]);
    
    useEffect(() => {
        if(deleteRow) {
            // setProfessors(professors.filter(p => p.username !== rowSel.username))
            const temp = professors;
            temp.splice(temp.findIndex(p => p.username === rowSel.username), 1)
            setProfessors(temp);

            setRowSel(null);
            setDeleteRow(false);
        }
    }, [deleteRow]);

    useEffect(() => (
        setProfessors(professorApi.filter(p => p.school === school))
    ), []);

    return (
        <div className='admin-professors'>
            <TableProfessors
                professors={professors}
            />
        </div>
    )
}
