import { useContext } from 'react';
import { Table } from 'antd';

import AdminContext from '../AdminContext';

import { getAgeFromBirthDate } from '../../../libraries/General/utils';

export default function TableStudents(props) {
    const { students } = props;
    const { setRowSel } = useContext(AdminContext);

    const columns = [
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

    const data = students.map(({ firstname, lastname, identityDoc: id, course: { code }, gender, birthDate }, 
        key) => (
        {
            key, firstname, lastname, id, gender,
            age: getAgeFromBirthDate(birthDate),
            course: code,
        }
    ));

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setRowSel(selectedRowKeys);
        },
    }

    return (
        <Table
            dataSource={data}
            columns={columns}
            rowSelection={rowSelection}
        />
    );

}
