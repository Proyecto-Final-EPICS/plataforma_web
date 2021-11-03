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
            width: 100,
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
            title: 'Tiempo promedio (horas)',
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

    // const formatData = () => {
    //     if(!query.app) return [];

    //     // const oneApp = query.app.length == 1
    //     const oneApp = typeof query.app == 'string'

    //     oneApp && columns.splice(columns.length - 1, 0, {
    //         title: 'Máximo nivel',
    //         dataIndex: 'highestLevel',
    //         key: 'highestLevel',
    //         width: 80, 
    //     })
    //     // courses.filter(course => course.performance.some(app => query.app.includes(app.code)));

    //     return courses.map((course, index) => {
    //         let totTime = 0;
    //         let accuracy = 0;
    //         let lastCon = null, lastConMilis = 0;
            
    //         // Se filtran aquellas sesiones cuya app se encuentra en la consulta
    //         course.performance.forEach(app => {
    //             accuracy += app.accuracy;
    //             totTime += s.duration;
    //             const date = new Date(s.date);
    //             const dateMilis = date.getTime();
    //             if(dateMilis > lastConMilis) {
    //                 lastConMilis = dateMilis;
    //                 lastCon = date;
    //             }
    //         });
    //         totTime /= 36000;
    
    //         const {firstname, lastname, age, identityDoc: id, gender, course} = student;
    //         const name = firstname + ' ' + lastname;
    
    //         const row = {
    //             name, id, age, gender, course, totTime,
    //             avTime: totTime/student.sessions.length,
    //             accuracy: accuracy/student.sessions.length,
    //             lastCon: lastCon.toDateString(),
    //             key: index,
    //         };
    //         if(oneApp) row.highestLevel = student.sessions[0].highestLevel;
    //         return row;
    //         const {name, code, level, performance} = course;

    //         let highestLevel = 0, totTime = 0, avTime = 0, accuracy = 0;

    //         return {
    //             name, code, level, totTime, avTime, accuracy, highestLevel,
    //             key: index,
    //         };
    //     });

    // }
    
    return (
        <Table
            // columns={columns} 
            // dataSource={formatData()} 
            // scroll={{ x: 1500, y: 300 }}
        />
    );
}
