import { useState, useEffect, useContext } from 'react';
import TableDirectors from '../../../components/Admin/TableDirectors';
import DirectorForm from '../../../components/Admin/Forms/DirectorForm';

import AdminContext from '../../../components/Admin/AdminContext';

import directorApi from '../../../mock_data/collections/director.json';

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
            // setDirectors(directors.filter(d => d.username !== rowSel.username))
            const temp = directors;
            temp.splice(temp.findIndex(d => d.username === rowSel.username), 1)
            setDirectors(temp);

            setRowSel(null);
            setDeleteRow(false);
        }
    }, [deleteRow]);

    useEffect(() => (
        setDirectors(directorApi.filter(d => d.school === school))
    ), []);

    return (
        <div className='admin-directors'>
            <TableDirectors 
                directors={directors}
            />
        </div>
    )
}
