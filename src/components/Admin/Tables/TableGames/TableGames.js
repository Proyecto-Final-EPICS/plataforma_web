import { useEffect, useContext } from 'react';
import { Table } from 'antd';

import AdminContext from '../../AdminContext';
import { parseName } from '../../../../libraries/General/utils';

export default function TableGames(props) {
    const { games } = props;
    const { rowSel, setRowSel, search } = useContext(AdminContext);

    const getFilteredGames = () => {
        let fxdSearch = search.trim();
        
        if(fxdSearch) {
            fxdSearch = fxdSearch.toLowerCase();

            return games.filter(g => (
                g.code.toLowerCase().includes(fxdSearch) 
                || g.name.toLowerCase().includes(fxdSearch)
                || g.level.toLowerCase().includes(fxdSearch)
            ))
        } else return games;
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
            title: 'Tópico',
            dataIndex: 'topic',
        },
        {
            title: 'Desarrolladores',
            dataIndex: 'devs',
            render: (_, record) => record.devs.map((d, index) => (
                <div key={index}>{d}</div>
            )),
        },
        {
            title: 'Módulos',
            dataIndex: 'modules',
            render: (_, record) => record.modules.map((m, index) => (
                <div key={index}>{m}</div>
            )),
        },
        {
            title: 'Lanzamiento',
            dataIndex: 'launch_date',
        },
    ]

    console.log(getFilteredGames());
    const data = getFilteredGames().map(({ code, name, level, topic, devs, modules, 
        launch_date: { $date } }, key) => (
        {
            key, code, name, level, topic, 
            launch_date: new Date($date).toDateString(),
            devs: devs.map(d => parseName(d.firstname, d.lastname)),
            modules: modules.map(m => m.name)
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
