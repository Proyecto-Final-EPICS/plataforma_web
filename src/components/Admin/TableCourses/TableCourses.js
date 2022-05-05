import { useContext } from 'react';
import { Table } from 'antd';

import AdminContext from '../AdminContext';

export default function TableCourses(props) {
    const { courses } = props;
    const { rowSel, setRowSel } = useContext(AdminContext);

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

    const data = courses.map(({ code, name, level, capacity }, 
        key) => (
        { key, code, name, level, capacity }
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
