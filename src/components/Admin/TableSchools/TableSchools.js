import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';
import { parseLocation, parsePhone } from '../../../libraries/General/utils';

import AdminContext from '../AdminContext';

export default function TableSchools(props) {
    const { schools } = props;
    const { rowSel, setRowSel, search } = useContext(AdminContext);

    const getFilteredSchools = () => {
        let fxdSearch = search.trim();
        
        if(fxdSearch) {
            fxdSearch = fxdSearch.toLowerCase();

            return schools.filter(c => (
                c.code.toLowerCase().includes(fxdSearch) 
                || c.name.toLowerCase().includes(fxdSearch)
            ))
        } else return schools;
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Ubicación',
            dataIndex: 'location',
        },
        {
            title: 'Contacto',
            dataIndex: 'phone',
        },
        {
            "title": "Acción",
            "key": "action",
            render: (_, record) => (
                <Link to={`/schools/${record.id}`}>
                    <Button
                        className='button-purple' 
                        type="primary"
                    >
                        Ver
                    </Button>
                </Link>
            )
        },
    ]

    const data = getFilteredSchools().map(
        ({ school_name: name, id_school: id, contact_phone, location }, key) => (
            { 
                key, name, id, 
                location: parseLocation(location), 
                phone: parsePhone(contact_phone)
            }
        )
    );

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
