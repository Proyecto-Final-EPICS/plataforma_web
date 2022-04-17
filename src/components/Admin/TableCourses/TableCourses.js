import { useContext } from 'react';
import { Table } from 'antd';

import AdminContext from '../AdminContext';

export default function TableCourses(props) {
    const { courses } = props;
    const { setRowSel } = useContext(AdminContext);

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
            title: 'Período',
            dataIndex: 'period',
        },
    ]

    const data = courses.map(({ code, name, level, period }, 
        key) => (
        { key, code, name, level, period }
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
