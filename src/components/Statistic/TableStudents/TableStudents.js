import { Table, Button } from 'antd';

import { getAgeFromBirthDate } from '../../../libraries/General/utils';

export default function TableStudents(props) {
    const { students } = props;
    console.log(students);
    
    const genFilters = prop => {
        const filters = [];
        students.forEach(student => {
            if(!filters.some(f => f.value === student[prop])) {
                filters.push({
                    text: student[prop],
                    value: student[prop],
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
            // ...tableCustomFilters('name', query),
        },
        {
            title: 'Identificación',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            width: 40,
            // ...tableCustomFilters('id', query),
        },
        {
            title: 'Edad',
            dataIndex: 'age',
            key: 'age',
            fixed: 'left',
            width: 40,
            // defaultSortOrder: 'descend',
            sorter: (a, b) => a.birthDate - b.birthDate,
        },
        {
            title: 'Género',
            dataIndex: 'gender',
            key: 'gender',
            fixed: 'left',
            width: 50,
            filters: genFilters('gender'),
            onFilter: (value, record) => record.gender.indexOf(value) === 0,
        },
        {
            title: 'Curso',
            dataIndex: 'course',
            key: 'course',
            fixed: 'left',
            width: 40,
            filters: genFilters('course'),
            onFilter: (value, record) => record.course.indexOf(value) === 0,
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
            title: 'Última conexión',
            dataIndex: 'lastCon',
            key: 'lastCon',
            width: 100,
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
            width: 50,
            render: (_, record) => (
                <Button type="primary" onClick={() => console.log('jsjsjs')}>
                    Ver más
                </Button>
            )
        },
    ];

    const data = students.map((student, index) => {
        let totTime = 0;
        let accuracy = 0;
        let lastCon = null, lastConMilis = 0;
        
        // Se filtran aquellas sesiones cuya app se encuentra en la consulta
        // console.log(student);
        student.sessions.forEach(s => {
            // if(s.app.code)
            accuracy += s.accuracy;
            totTime += s.totTime;
            const date = new Date(s.date);
            const dateMilis = date.getTime();
            if(dateMilis > lastConMilis) {
                lastConMilis = dateMilis;
                lastCon = date;
            }
        });
        // totTime /= 3600 * 1000

        const {firstname, lastname, birthDate, identityDoc: id, gender, course} = student;
        const name = firstname + ' ' + lastname;

        const row = {
            name, id, gender, course, 
            age: getAgeFromBirthDate(birthDate),
            totTime: totTime.toFixed(1),
            avTime: (totTime / student.sessions.length).toFixed(1),
            accuracy: (accuracy / student.sessions.length).toFixed(2),
            lastCon: lastCon.toDateString(),
            key: index,
        };
        return row;
    });

    return (
        <Table
            columns={columns} 
            dataSource={data} 
            scroll={{ x: 1500, y: 300 }}
        />
    );
}
