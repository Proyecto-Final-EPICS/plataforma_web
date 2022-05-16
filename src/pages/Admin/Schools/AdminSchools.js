import { useState, useEffect, useContext } from 'react';
import TableSchools from '../../../components/Admin/TableSchools';
import SchoolForm from '../../../components/Admin/Forms/SchoolForm';

import AdminContext from '../../../components/Admin/AdminContext';

import schoolApi from '../../../mock_data/collections/school.json';

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
                    toEdit={schools.find(c => c.code === rowSel.code)}
                />
            );
            setModalTitle('Actualizar Colegio');
            setModalVisible(true);
            setEditRow(false);
        }
    }, [editRow]);
    
    useEffect(() => {
        if(deleteRow) {
            // setSchools(schools.filter(c => c.code !== rowSel.code))
            const temp = schools;
            temp.splice(temp.findIndex(c => c.code === rowSel.code), 1)
            setSchools(temp);

            setRowSel(null);
            setDeleteRow(false);
        }
    }, [deleteRow]);

    useEffect(() => setSchools(schoolApi), []);
    
    return (
        <div className='admin-schools'>
            <TableSchools schools={schools}/>
        </div>
    )
}
