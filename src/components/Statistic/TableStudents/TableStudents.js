import { Table, Button } from 'antd';
import { genFilters, parseName } from '../../../libraries/General/utils';

export default function TableStudents(props) {
    let students = props.students;
    if(!students || !students.length || !students[0]['username']) students = [];

    const data = students.map((student, index) => {
        let totTime = 0;
        let accuracy = 0;
        let lastCon = null, lastConMilis = 0;
        
        // Se filtran aquellas sesiones cuya app se encuentra en la consulta
        // console.log(student);
        student.sessions.forEach(s => {
            accuracy += s.accuracy;
            totTime += s.totTime;
            const date = new Date(s.date);
            const dateMilis = date.getTime();
            if(dateMilis > lastConMilis) {
                lastConMilis = dateMilis;
                lastCon = date;
            }
        });

        const { username, firstname, lastname, age, identity_doc, gender, course, sessions } = student;

        return {
            username, identity_doc, gender, course, age, 
            name: parseName(firstname, lastname),
            totTime: totTime.toFixed(1),
            avTime: (totTime / sessions.length).toFixed(1),
            accuracy: (accuracy / sessions.length).toFixed(2),
            lastCon: lastCon.toDateString(),
            key: index,
        };
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
            title: 'Usuario',
            dataIndex: 'username',
            key: 'username',
            fixed: 'left',
            width: 60,
        },
        {
            title: 'Identificación',
            dataIndex: 'identity_doc',
            key: 'id',
            fixed: 'left',
            width: 40,
        },
        {
            title: 'Edad',
            dataIndex: 'age',
            key: 'age',
            fixed: 'left',
            width: 40,
            sorter: (a, b) => a.birthDate - b.birthDate,
        },
        {
            title: 'Género',
            dataIndex: 'gender',
            key: 'gender',
            fixed: 'left',
            width: 50,
            filters: genFilters(data, 'gender'),
            onFilter: (value, record) => record.gender.indexOf(value) === 0,
        },
        {
            title: 'Curso',
            dataIndex: 'course',
            key: 'course',
            fixed: 'left',
            width: 40,
            filters: genFilters(data, 'course'),
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
