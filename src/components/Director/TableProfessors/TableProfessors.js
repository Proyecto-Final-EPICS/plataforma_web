import {Table, Button} from 'antd';
import { parsePhone } from '../../../libraries/General/utils';

export default function TableProfessors (props) {
    const { professors, seeProfessor } = props;
    
    const data = professors.map(({ username, firstname, lastname, identity_doc, email, phone, age, 
        gender }, index) => ({
        // 
        username, firstname, lastname, identity_doc, email, age, gender, 
        phone: parsePhone(phone), 
        key: index,
    }));
    
    const columns = [
        {
            'title': 'Usuario',
            'dataIndex': 'username',
            'key': 'username'
        },
        {
            'title': 'Apellidos',
            'dataIndex': 'lastname',
            'key': 'lastname'
        },
        {
            'title': 'Nombres',
            'dataIndex': 'firstname',
            'key': 'firstname'
        },
        {
            'title': 'Edad',
            'dataIndex': 'age',
            'key': 'age'
        },
        {
            'title': 'Identificación',
            'dataIndex': 'identity_doc',
            'key': 'identity_doc'
        },
        {
            'title': 'Teléfono',
            'dataIndex': 'phone',
            'key': 'phone'
        },
        {
            'title': 'Género',
            'dataIndex': 'gender',
            'key': 'gender'
        },
        {
            'title': 'Acción',
            'key': 'action',
            render: (_, record) => (
                <Button 
                    className='button-purple'
                    type='primary' 
                    onClick={() => seeProfessor(record.username)}
                >
                    Ver más
                </Button>
            )
        },
    ];

    return( 
        <Table columns={columns} dataSource={data}/>
    );

}
