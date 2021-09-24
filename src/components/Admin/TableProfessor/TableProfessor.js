import {Table, Button} from 'antd';

export default function TableProfessor (props) {
    const {professors, seeProfessor} = props;
    
    const data = professors.map((professor, index) => {
            
        const {username, firstname, lastname, email} = professor;

        return {
            key: index,
            username,
            firstname,
            lastname,
            email,
        };
    })
    
    const columns = [
        {
            "title": "Usuario",
            "dataIndex": "username",
            "key": "username"
        },
        {
            "title": "Apellidos",
            "dataIndex": "lastName",
            "key": "lastname"
        },
        {
            "title": "Nombres",
            "dataIndex": "firstName",
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
            render: (text, record) => (
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
