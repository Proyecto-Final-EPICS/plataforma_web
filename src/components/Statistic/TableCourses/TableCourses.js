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
        // const oneApp = query.app.length == 1
        const oneApp = typeof query.app == 'string'

        oneApp && columns.splice(columns.length - 1, 0, {
            title: 'Máximo nivel',
            dataIndex: 'highestLevel',
            key: 'highestLevel',
            width: 80, 
        })
        // console.log(courses);

        return courses.map((course, index) => {
            const {name, code, level, performance} = course;
            let totTime = 0, numSessions = 0, accuracy = 0;

            performance.forEach(app => {
                totTime += app.totTime;
                numSessions += app.numSessions;
                accuracy += app.accuracy;
            });

            const row = {
                name, code, level,
                accuracy,
                totTime: totTime / 36000,
                avTime: totTime / numSessions / 36000,
                key: index,
            }

            if(oneApp) row.highestLevel = course.performance[0].highestLevel;
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
