//Liberias
import React from 'react';
import { List, Button, Card } from 'antd';
import { CaretUpOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

//estilos
import './ListProfessor.scss'


export default function ListProfessors(props) {
    const { profesores } = props;
    return (
        <div className="list-professor">
            <Professors profesores={profesores} />
        </div>
    );
}

function Professors(props) {
    const { profesores } = props;
    return (

        <List
            grid={{ gutter: 16, column: 1 }}
            className="profesores"
            itemLayout="horizontal"
            dataSource={profesores}
            renderItem={profesores => <Profesor
                profesor={profesores}
            />} s
        />
    );
}

function Profesor(props) {
    const { profesor } = props;
    return (
        <Card className="card-director">
            <List.Item>
                <div className="card-director__content">
                    <h1 className="card-director__content__title">
                        {profesor.username}
                    </h1>
                    <Link to={`/home/colegios/${profesor.username}`}>
                        <Button type="primary" className="card-director__button">
                            Entrar
                                <CaretUpOutlined />
                        </Button>
                    </Link>
                </div>
            </List.Item>
        </Card>

    );
}