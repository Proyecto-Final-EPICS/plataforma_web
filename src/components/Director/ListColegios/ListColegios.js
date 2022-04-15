//Liberias
import React from 'react';
import { List, Button, Card } from 'antd';
import { CaretUpOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';



//Estilos
import './ListColegio.scss';


export default function ListColegios(props) {
    const { colegios } = props;
    return (
        <div className="list-colegios-director">
            <Colegios colegios={colegios} />
        </div>
    );
}

function Colegios(props) {
    const { colegios } = props;
    return (

        <List
            grid={{ gutter: 16, column: 1 }}
            className="colegios"
            itemLayout="horizontal"
            dataSource={colegios}
            renderItem={colegio => <Colegio
                colegio={colegio}
            />}
        />
    );
}

function Colegio(props) {
    const { colegio } = props;
    // console.log(colegio);
    return (
        <Card className="card-director">
            <List.Item>
                <div className="card-director__content">
                    <h1 className="card-director__content__title">
                        {colegio.schoolName}
                    </h1>
                    <div>
                        <Link to={`/home/colegios/${colegio.schoolName}`}>
                            <Button type="primary" className="card-director__button">
                                Entrar
                                <CaretUpOutlined />
                            </Button>
                        </Link>
                    </div>
                </div>
            </List.Item>
        </Card>

    );
}