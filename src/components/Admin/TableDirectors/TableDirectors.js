import { useContext } from 'react';
import { Table } from 'antd';

import AdminContext from '../AdminContext';

import { getAgeFromBirthDate } from '../../../libraries/General/utils';

export default function TableDirectors(props) {
    const { directors } = props;
    const { setRowSel } = useContext(AdminContext);

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

    const data = directors.map(({ firstname, lastname, username, identityDoc: id, email, phone, gender, 
        birthDate }, key) => (
        {
            key, firstname, lastname, username, id, email, phone, gender,
            age: getAgeFromBirthDate(birthDate)
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
