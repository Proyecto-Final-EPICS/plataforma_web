import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';

export default function TableSchools(props) {
    const { schools } = props;

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
            title: 'Ubicación',
            dataIndex: 'loc',
            render: (_, {loc}) => (
                <div>{`${loc.city}, ${loc.country}`}</div>
            )
        },
        {
            "title": "Acción",
            "key": "action",
            render: (_, record) => (
                <Link to={`/schools/${record.code}`}>
                <Button type="primary">Ver</Button>
                </Link>
            )
        },
    ]

    const data = schools.map(({name, code, location: loc}, key) => (
        { key, name, code, loc }
    ));

    return (
        <Table
            dataSource={data}
            columns={columns}
        />
    );

}
