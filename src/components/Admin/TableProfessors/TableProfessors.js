import { useContext } from 'react';
import { Table } from 'antd';

import AdminContext from '../AdminContext';

import { getAgeFromBirthDate } from '../../../libraries/General/utils';

export default function TableProfessors(props) {
    const { professors } = props;
    const { rowSel, setRowSel } = useContext(AdminContext);

    const columns = [
        {
            title: 'Usuario',
            dataIndex: 'username',
        },
        {
            title: 'Cédula',
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
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',
            render: (_, {phone}) => (
                <div>{`+${phone.countryCode} ${phone.number}`}</div>
            )
        },
    ]

    const data = professors.map(({ firstname, lastname, username, identityDoc: id, email, phone, gender, 
        birthDate }, key) => (
        {
            key, firstname, lastname, username, id, email, phone, gender,
            age: getAgeFromBirthDate(birthDate)
        }
    ));

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => setRowSel(selectedRows[0]),
        selectedRowKeys: rowSel ? [rowSel.key] : [],
    }
    return (
        <Table
            dataSource={data}
            columns={columns}
            rowSelection={rowSelection}
        />
    );

}
