//Liberiras
import React,{useState,useEffect} from 'react';
import {List,Table,Button} from 'antd';
import {Link,useParams} from 'react-router-dom';

//Componentes
import Modal from '../../../components/General/Modal';
import Grafico from '../../../components/Professor/Grafico';

//Estilos
import './ListSessions.scss';

export default function ListSessions(props){
    const {sessions} = props;
    const {colegio,estudiante,username,game,nivel} = useParams();

    //Constantes para el modal
    const [isVisibleModal,setIsVisibleModal] = useState(false);
    const [modalTitle,setModalTitle] = useState("");
    const [modalContent,setModalContent] = useState(null);
    const parameters = [];


    const getColumns = (sessions) =>{
        const columns = [
            {
                title: "Nro de Sesión",
                dataIndex: "nro_de_sesion",
                key:"nro_de_sesion"
            }
        ]

        let sw = true;
        sessions.forEach((session,index) =>{
            if(session[0].level == nivel && sw){
                session[0].parameters.forEach(par =>{
                    const c = {
                        title: par.name,
                        dataIndex: par.name,
                        key: par.name
                    }
                    columns.push(c);
                    parameters.push({ 'name': par.name, values: [] });
                })
                sw = false;
            }
        })
        return columns;
    }

    const info = (sessions) =>{
        const dataSource = []
        let it = 1;
        sessions.forEach((session,index) => {
            if(session[0].level == nivel){
                const data = {
                    key: index,
                    nro_de_sesion: it   
                }
                session[0].parameters.forEach(par =>{
                    data[par.name] = par.value;
                    addDataParameter(par.name, par.value);
                })
                dataSource.push(data);
                it++;
            }  
        })
        return dataSource;
    }

    const grafico = ()=>{
        setIsVisibleModal(true);
        setModalTitle("Seleccione un parámetro");
        setModalContent(  
          <Grafico parameters={parameters}/>
        )
    }

    const addDataParameter = (parameter, value) => {
        parameters.forEach((p,index) => {
            if (p.name == parameter) {
                if(!Number.isNaN(parseInt(value)) || !Number.isNaN(parseFloat(value))){
                    p.values.push(value);
                }else{
                    parameters.splice(index, 1);
                }
            }
        }
        )
    }

    return(

        <div className="nivel-content">
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
            
            <Button className="nivel-content__button" onClick={grafico}>
              Gráficos del nivel
            </Button>

            <Table columns={getColumns(sessions)} dataSource={info(sessions)} />
        </div>
    )
}








