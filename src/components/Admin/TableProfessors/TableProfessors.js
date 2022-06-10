import { useEffect, useContext } from 'react';
import { Table } from 'antd';

import AdminContext from '../AdminContext';

import { parsePhone } from '../../../libraries/General/utils';

export default function TableProfessors(props) {
    const { professors } = props;
    const { rowSel, setRowSel, search } = useContext(AdminContext);

    const getFilteredProfessors = () => {
        let fxdSearch = search.trim();
        
        if(fxdSearch) {
            fxdSearch = fxdSearch.toLowerCase();

            return professors.filter(p => (
                p.username.toLowerCase().includes(fxdSearch) 
                || p.identity_doc === fxdSearch
                || p.lastname.toLowerCase().includes(fxdSearch)
                || p.firstname.toLowerCase().includes(fxdSearch)
                || p.email.includes(fxdSearch)
            ))
        } else return professors;
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

    const data = getFilteredProfessors().map(({ firstname, lastname, username, identity_doc, email, 
        phone, gender, age }, key) => (
        {
            key, firstname, lastname, username, identity_doc, email, gender, age, 
            phone: parsePhone(phone),
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
