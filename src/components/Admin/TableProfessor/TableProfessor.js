import {Table, Button} from 'antd';

export default function TableProfessor (props) {
    const {professors, seeProfessor} = props;
    // console.log(professors);
    const data = professors.map((professor, index) => (
        {
            ...professor,
            key: index,
        }
    ));
    
    const columns = [
        {
            "title": "Usuario",
            "dataIndex": "username",
            "key": "username"
        },
        {
            "title": "Apellidos",
            "dataIndex": "lastname",
            "key": "lastname"
        },
        {
            "title": "Nombres",
            "dataIndex": "firstname",
            "key": "firstname"
        },
        {
            "title": "Email",
            "dataIndex": "email",
            "key": "email"
        },
        {
            "title": "Acción",
            "key": "action",
            render: (_, record) => (
                <Button type="primary" onClick={() => seeProfessor(record.username)}>
                    Ver más
                </Button>
            )
        },
        
    ];

    return( 
        <Table columns={columns} dataSource={data}/>
    );

}
