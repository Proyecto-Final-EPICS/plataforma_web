import { useState, useEffect, useContext } from 'react';
import TableDirectors from '../../../components/Admin/TableDirectors';
import RegisterDirectorForm from '../../../components/Admin/Forms/RegisterDirectorForm';

import AdminContext from '../../../components/Admin/AdminContext';

import userApi from '../../../mock_data/collections/user.json';

import './AdminDirectors.scss';

export default function AdminDirectors(props) {
    const [directors, setDirectors] = useState([]);
    // const {resetForm, setResetForm} = useState(false);
    const { school, rowSel, setRowSel, addRow, setAddRow, editRow, setEditRow, deleteRow, setDeleteRow, 
        modalVisible, setModalVisible, setModalContent, setModalTitle } 
        = useContext(AdminContext);
    
    useEffect(() => {
        if(addRow) {
            setModalContent(
                <RegisterDirectorForm
                    directors={directors} 
                    setDirectors={setDirectors} 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            )
            setModalTitle('Registrar Director');
            setModalVisible(true);
            // setResetForm(true);
            setAddRow(false);
        }
    }, [addRow]);
    
    useEffect(() => {
        if(editRow) {
            const dir = directors.find(d => d.username === rowSel.username);

            setModalContent(
                <RegisterDirectorForm
                    directors={directors} 
                    setDirectors={setDirectors} 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    edit
                    initialValues={dir}
                />
            );
            setModalTitle('Actualizar Director');
            setModalVisible(true);
            // setResetForm(true);
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

    // useEffect(() => {
    //     console.log('modalVisible: ', modalVisible);
    // }, [modalVisible])

    useEffect(() => (
        setDirectors(userApi.filter(u => u.school.code === school && u.role === 'director'))
    ), []);

    return (
        <div className='admin-directors'>
            <TableDirectors 
                directors={directors}
            />
        </div>
    )
}
