import { useEffect, useContext } from 'react';
import { Table } from 'antd';

import AdminContext from '../../AdminContext';

import { parsePhone } from '../../../../libraries/General/utils';

export default function TableDirectors(props) {
    const { directors } = props;
    const { rowSel, setRowSel, search } = useContext(AdminContext);

    const getFilteredDirectors = () => {
        let fxdSearch = search.trim();
        
        if(fxdSearch) {
            fxdSearch = fxdSearch.toLowerCase();

            return directors.filter(d => (
                d.username.toLowerCase().includes(fxdSearch) 
                || d.identity_doc === fxdSearch
                || d.lastname.toLowerCase().includes(fxdSearch)
                || d.firstname.toLowerCase().includes(fxdSearch)
                || d.email.includes(fxdSearch)
            ))
        } else return directors;
    }

    const columns = [
        {
            title: 'Usuario',
            dataIndex: 'username',
        },
        {
            title: 'Cédula',
            dataIndex: 'identity_doc',
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
        },
    ]

    const data = getFilteredDirectors().map(({ firstname, lastname, username, identity_doc, email, 
        phone, gender, age }, key) => (
        {
            key, firstname, lastname, username, identity_doc, email, gender, age,
            phone: parsePhone(phone)
        }
    ));

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => setRowSel(selectedRows[0]),
        selectedRowKeys: rowSel ? [rowSel.key] : [],
    }

    useEffect(() => setRowSel(null), [search]);

    return (
        <Table
            dataSource={data}
            columns={columns}
            rowSelection={rowSelection}
        />
    );

}
