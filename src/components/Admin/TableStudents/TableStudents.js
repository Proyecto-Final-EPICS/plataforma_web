import { useEffect, useContext } from 'react';
import { Table } from 'antd';

import AdminContext from '../AdminContext';

import { getAgeFromBirthDate } from '../../../libraries/General/utils';

export default function TableStudents(props) {
    const { students } = props;
    const { rowSel, setRowSel, search } = useContext(AdminContext);

    const getFilteredStudents = () => {
        let fxdSearch = search.trim();
        
        if(fxdSearch) {
            fxdSearch = fxdSearch.toLowerCase();

            return students.filter(s => (
                s.username.toLowerCase().includes(fxdSearch) 
                || s.identityDoc === fxdSearch
                || s.lastname.toLowerCase().includes(fxdSearch)
                || s.firstname.toLowerCase().includes(fxdSearch)
                || s.course.toLowerCase().includes(fxdSearch)
            ))
        } else return students;
    }

    const columns = [
        {
            title: 'Usuario',
            dataIndex: 'username',
        },
        {
            title: 'Curso',
            dataIndex: 'course',
        },
        {
            title: 'Identificación',
            dataIndex: 'id',
        },
        {
            title: 'Apellidos',
            dataIndex: 'lastname',
        },
        {
            title: 'Nombres',
            dataIndex: 'firstname',
        },
        {
            title: 'Género',
            dataIndex: 'gender',
        },
        {
            title: 'Edad',
            dataIndex: 'age',
            // render: (_, { birthDate }) => (
            //     <div>{getAgeFromBirthDate(birthDate)}</div>
            // ),
        },
    ]

    const data = getFilteredStudents().map(({ username, firstname, lastname, identityDoc: id, course, 
        gender, birthDate }, key) => (
        {
            key, username, firstname, lastname, id, gender, course,
            age: getAgeFromBirthDate(birthDate),
        }
    ));

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => setRowSel(selectedRows[0]),
        selectedRowKeys: rowSel ? [rowSel.key] : [],
    }

    useEffect(() => {
        setRowSel(null);
    }, [search]);

    return (
        <Table
            dataSource={data}
            columns={columns}
            rowSelection={rowSelection}
        />
    );

}
