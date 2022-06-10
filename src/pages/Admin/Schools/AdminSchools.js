import { useState, useEffect, useContext } from 'react';
import TableSchools from '../../../components/Admin/TableSchools';
import SchoolForm from '../../../components/Admin/Forms/SchoolForm';

import AdminContext from '../../../components/Admin/AdminContext';

import { delSchool, getSchools } from '../../../api/school';

import './AdminSchools.scss';

export default function AdminSchools(props) {
    const [schools, setSchools] = useState([]);
    const { school, rowSel, setRowSel, addRow, setAddRow, editRow, setEditRow, deleteRow, setDeleteRow, 
        setModalVisible, setModalContent, setModalTitle } = useContext(AdminContext);
    
    useEffect(() => {
        if(addRow) {
            setModalContent(
                <SchoolForm
                    schools={schools} 
                    setSchools={setSchools} 
                    setModalVisible={setModalVisible}
                />
            )
            setModalTitle('Registrar Colegio');
            setModalVisible(true);
            setAddRow(false);
        }
    }, [addRow]);
    
    useEffect(() => {
        if(editRow) {
            setModalContent(
                <SchoolForm
                    schools={schools} 
                    setSchools={setSchools} 
                    setModalVisible={setModalVisible}
                    edit
                    toEdit={schools.find(s => s.id_school === rowSel.id)}
                    setRowSel={setRowSel}
                />
            );
            setModalTitle('Actualizar Colegio');
            setModalVisible(true);
            setEditRow(false);
        }
    }, [editRow]);
    
    useEffect(() => {
        if(deleteRow) {
            delSchool(rowSel.id).then(json => setSchools(json));

            setRowSel(null);
            setDeleteRow(false);
        }
    }, [deleteRow]);

    useEffect(() => (
        getSchools().then(res => setSchools(res))
    ), []);

    return (
        <div className='admin-schools'>
            <TableSchools schools={schools}/>
        </div>
    )
}
