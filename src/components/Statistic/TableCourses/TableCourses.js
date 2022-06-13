import { Table, Button } from 'antd';
import { genFilters } from '../../../libraries/General/utils';

export default function TableCourses(props) {
    const { courses } = props;
    if(!courses || !courses.length || !courses[0]['code']) return null;
    
    const data = courses.map((course, index) => {
        console.log(course);
        const { name, code, level, professors, games, capacity, students, sessions } = course;
        let totTime = 0, accuracy = 0;

        sessions.forEach(s => {
            totTime += s.totTime;
            accuracy += s.accuracy;
        });

        return {
            name, code, level, professors, games, 
            capacity: `${students.length}/${capacity}`,
            totTime: totTime.toFixed(1),
            avTime: (totTime / sessions.length).toFixed(1),
            accuracy: (accuracy / sessions.length).toFixed(2),
            key: index,
        }
    });

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 60,
        },
        {
            title: 'Código',
            dataIndex: 'code',
            key: 'code',
            fixed: 'left',
            width: 60,
        },
        {
            title: 'Nivel',
            dataIndex: 'level',
            key: 'level',
            fixed: 'left',
            width: 40,
            filters: genFilters(data, 'level'),
            onFilter: (value, record) => record.level.indexOf(value) === 0, 
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
                <Button 
                    className='button-purple'
                    type="primary" 
                    onClick={() => console.log('jsjsjs')}
                >
                    Ver más
                </Button>
            )
        },
    ];

    return (
        <Table
            columns={columns} 
            dataSource={data} 
            scroll={{ x: 1500, y: 300 }}
        />
    );
}
