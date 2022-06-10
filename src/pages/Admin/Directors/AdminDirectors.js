import { useState, useEffect, useContext } from 'react';
import TableDirectors from '../../../components/Admin/TableDirectors';
import DirectorForm from '../../../components/Admin/Forms/DirectorForm';

import AdminContext from '../../../components/Admin/AdminContext';

import { delDirector, getDirectorsFromSchool } from '../../../api/director';

import './AdminDirectors.scss';

export default function AdminDirectors(props) {
    const [directors, setDirectors] = useState([]);
    const { school, rowSel, setRowSel, addRow, setAddRow, editRow, setEditRow, deleteRow, setDeleteRow, 
        setModalVisible, setModalContent, setModalTitle } = useContext(AdminContext);
    
    useEffect(() => {
        if(addRow) {
            setModalContent(
                <DirectorForm
                    directors={directors} 
                    setDirectors={setDirectors} 
                    setModalVisible={setModalVisible}
                    school={school}
                />
            )
            setModalTitle('Registrar Director');
            setModalVisible(true);
            setAddRow(false);
        }
    }, [addRow]);
    
    useEffect(() => {
        if(editRow) {
            setModalContent(
                <DirectorForm
                    directors={directors} 
                    setDirectors={setDirectors} 
                    setModalVisible={setModalVisible}
                    school={school}
                    edit
                    toEdit={directors.find(d => d.username === rowSel.username)}
                />
            );
            setModalTitle('Actualizar Director');
            setModalVisible(true);
            setEditRow(false);
        }
    }, [editRow]);
    
    useEffect(() => {
        if(deleteRow) {
            delDirector(rowSel.username).then(json => setDirectors(json));
            setRowSel(null);
            setDeleteRow(false);
        }
    }, [deleteRow]);

    useEffect(() => (
        getDirectorsFromSchool(school).then(json => setDirectors(json))
    ), []);

    return (
        <div className='admin-directors'>
            <TableDirectors 
                directors={directors}
            />
        </div>
    )
}
