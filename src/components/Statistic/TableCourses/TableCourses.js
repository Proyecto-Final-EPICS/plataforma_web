import {useState, useEffect} from 'react';
import {Row, Table, Button} from 'antd';
import { getColumnSearchProps } from '../../../libraries/Components/table';

export default function TableCourses(props) {
    const {query, courses} = props;

    // console.log(query);
    const genFilters = (prop) => {
        const filters = [];
        courses.forEach(course => {
            if(!filters.some(f => f.value === course[prop])) {
                filters.push({
                    text: course[prop],
                    value: course[prop],
                });
            }
        });
        return filters;
    }

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 60,
            // ...getColumnSearchProps('name', query),
        },
        {
            title: 'Código',
            dataIndex: 'code',
            key: 'code',
            fixed: 'left',
            width: 60,
            // ...getColumnSearchProps('id', query),
        },
        {
            title: 'Nivel',
            dataIndex: 'level',
            key: 'level',
            fixed: 'left',
            width: 40,
            // defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Tiempo total (horas)',
            dataIndex: 'totTime',
            key: 'totTime',
            width: 80,
        },
        {
            title: 'Tiempo promedio por sesión (horas)',
            dataIndex: 'avTime',
            key: 'avTime',
            width: 80,
        },
        {
            title: 'Precisión',
            dataIndex: 'accuracy',
            key: 'accuracy',
            width: 80,
        },
        {
            title: "Acción",
            key: "action",
            fixed: 'right',
            width: 80,
            render: (_, record) => (
                <Button type="primary" onClick={() => console.log('jsjsjs')}>
                    Ver más
                </Button>
            )
        },
    ];

    const formatData = () => {
        return courses.map((course, index) => {
            const {name, code, level, sessions} = course;
            let totTime = 0, accuracy = 0, highestLevel = NaN;

            sessions.forEach(s => {
                totTime += s.totTime;
                accuracy += s.accuracy;
                if(isNaN(highestLevel) || s.highestLevel >= highestLevel) highestLevel = s.highestLevel;
            });

            const row = {
                name, code, level,
                accuracy: accuracy / sessions.length,
                totTime: totTime / 36000,
                avTime: totTime / sessions.length / 36000,
                key: index,
            }

            return row;
        });

    }

    return (
        <Table
            columns={columns} 
            dataSource={formatData()} 
            scroll={{ x: 1500, y: 300 }}
        />
    );
}
