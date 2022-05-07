import { useEffect, useContext } from 'react';
import { Table } from 'antd';

import AdminContext from '../AdminContext';

import { getAgeFromBirthDate } from '../../../libraries/General/utils';

export default function TableDirectors(props) {
    const { directors } = props;
    const { rowSel, setRowSel, search } = useContext(AdminContext);

    const getFilteredDirectors = () => {
        let fxdSearch = search.trim();
        
        if(fxdSearch) {
            fxdSearch = fxdSearch.toLowerCase();

            return directors.filter(d => (
                d.username.toLowerCase().includes(fxdSearch) 
                || d.identityDoc === fxdSearch
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

    const data = getFilteredDirectors().map(({ firstname, lastname, username, identityDoc: id, email, 
        phone, gender, birthDate }, key) => (
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
