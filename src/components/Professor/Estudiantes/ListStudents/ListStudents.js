//Liberías
import React from 'react';
import { List, Button, Card } from 'antd';
import { Link, useLocation } from 'react-router-dom';


//Estilos
import './ListStudents.scss';

//Assets
import Lapiz from '../../../../assets/icons/icons8-edit-64.png';
import Caja from  '../../../../assets/icons/icons8-empty-box-64.png';

export default function ListStudents(props) {
    const { students } = props;
    if (students[0] === "") {
        return(

            <div className="container">
                <div className="container__nostudents">
                    <h1>
                        No se encontraron estudiantes 
                    </h1>
                    <img src={Caja} alt="icono de caja"/>
                </div>
            </div>
        );
    } else {
        return (
            <div className="list-students">
                <Students students={students} />
            </div>
        );
    }
}

function Students(props) {
    const { students } = props;
    const location = useLocation().pathname.split("/")[3];

   
    return (
        <List
            grid={{gutter: 16, column: 1}}
            className="colegios"
            itemLayout="horizontal"
            dataSource={students}
            renderItem={student => <Student
                student={student}
                colegio={location}
            />}
        />
    );
}

function Student(props) {
    const { student,colegio } = props;
    return (
       <Card className="card">
            <List.Item
                actions={[
                    <div className="card__content-est">
                        <h1 className="card__content-est__title">
                            {student.studentName}
                        </h1>

                        <h1 className="card__content-est__title">
                            {student.age}
                        </h1>

                        <h1 className="card__content-est__title">
                            {student.username}
                        </h1>

                        {/* <Button className="card__content-est__edit">
                            <img src={Lapiz} className="card__content-est__edit__image" alt="icono de editar"/>
                        </Button> */}

                        
                        <Link to ={`/home/colegios/${colegio}/estudiantes/${student.studentName}-${student.username}`} >
                            <Button type="primary" className="card__content-est__button">
                                Entrar
                            </Button>
                        </Link>

                       
                    </div>
                    
                    
                ]}
            >
                {/* <List.Item.Meta
                    title={`
                        ${student.studentName
                        }
                        ${student.age
                        }
                        ${student.username
                        }
                    `}
                /> */}
            </List.Item>
       </Card>
    );
}