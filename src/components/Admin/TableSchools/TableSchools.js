import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';

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
            title: 'Código',
            dataIndex: 'code',

        },
        {
            title: 'Nombre',
            dataIndex: 'name',
        },
        {
            title: 'Ubicación',
            dataIndex: 'location',
            render: (_, {location: {city, region, country}}) => (
                <div>{`${city}, ${region}, ${country}`}</div>
            )
        },
        {
            "title": "Acción",
            "key": "action",
            render: (_, record) => (
                <Link to={`/schools/${record.code}`}>
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

    const data = getFilteredSchools().map(({ name, code, location }, key) => (
        { key, name, code, location }
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
