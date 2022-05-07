import { useEffect, useContext } from 'react';
import { Table } from 'antd';

import AdminContext from '../AdminContext';

export default function TableCourses(props) {
    const { courses } = props;
    const { rowSel, setRowSel, search } = useContext(AdminContext);

    const getFilteredCourses = () => {
        let fxdSearch = search.trim();
        
        if(fxdSearch) {
            fxdSearch = fxdSearch.toLowerCase();

            return courses.filter(c => (
                c.code.toLowerCase().includes(fxdSearch) 
                || c.name.toLowerCase().includes(fxdSearch)
                || c.level.toLowerCase().includes(fxdSearch)
            ))
        } else return courses;
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
            title: 'Nivel',
            dataIndex: 'level',
        },
        {
            title: 'Capacidad',
            dataIndex: 'capacity',
        },
    ]

    const data = getFilteredCourses().map(({ code, name, level, capacity }, key) => (
        { key, code, name, level, capacity }
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
