//Liberias
import React from 'react';
import {List,Button,Card} from 'antd';
import {CaretUpOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';



//Estilos
import './ListColegios.scss';


export default function ListColegios(props){
    const {colegios} = props;
    return(
        <div className="list-colegios">
            <Colegios colegios={colegios}/>
        </div>
    );
}

function Colegios(props){
    const {colegios} = props;
    return(
        
        <List
            grid={{gutter: 16, column: 1}}
            className= "colegios"
            itemLayout= "horizontal"
            dataSource={colegios}
            renderItem={colegio => <Colegio
                colegio = {colegio}
            />}
        />
    );
}

function Colegio(props){
    const {colegio} = props;
    // console.log(colegio);
    return(
        <Card className="card">
            <List.Item
                actions={[
                    <div className="card__content">
                        <h1 className="card__content__title">
                            {colegio.schoolName}
                        </h1>
                        {/* <h1 className="card__content__title">
                            xD
                        </h1> */}
        
                        <Link to ={`/home/colegios/${colegio.schoolName}`}>
                            <Button type="primary" className="card__button"> 
                                Entrar
                                <CaretUpOutlined />
                            </Button> 
                        </Link>
                    </div>
                    
                ]}
                
               
            >
                {/* <div className="card__content">
                    <List.Item.Meta
                        title={`
                            ${colegio.schoolName}
                        `}
                    />
                </div> */}
            </List.Item>
        </Card>
        
    );
}