//Liberias
import React,{useState} from 'react';
import {Row, Col} from 'antd';
import {Link,useParams} from 'react-router-dom';


//Componentes
import Modal from '../../../components/General/Modal';
import SelectLevel from '../../../components/Professor/SelectLevel';
import Recomendacion from '../../../components/Professor/Recomendacion';

//Estilos
import './Menu_Cards.scss';

//Assets
import Nivel from '../../../assets/icons/level-up.png';
import Consejo from '../../../assets/icons/advice.png';
import Grafico from '../../../assets/icons/analytics.png';

export default function Menu_Cards(){
    const {colegio,estudiante,username,game} = useParams();
   

    //Constantes para el modal
    const [isVisibleModal,setIsVisibleModal] = useState(false);
    const [modalTitle,setModalTitle] = useState("");
    const [modalContent,setModalContent] = useState(null);



    const selectLevelModal = () =>{
        setIsVisibleModal(true);
        setModalTitle("Seleccione el Nivel");
        setModalContent(
            <SelectLevel
                colegio={colegio}
                estudiante={estudiante}
                username={username}
                game={game}
            />
        )
    }

    const recomendacionModal = () =>{
        setIsVisibleModal(true);
        setModalTitle("Recomendaciones");
        setModalContent(
            <Recomendacion
                game={game}
                username={username}
                estudiante={estudiante}
            />
        )
    }

    return(
        <div className="content-menu">

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>

            <Row >
                <Col span={8}>
                </Col>
                <Col span={8}>
                    <div className="content-menu__titulo">
                        <h1>
                            SELECCIONE UNA OPCIÓN
                        </h1>
                    </div>
                </Col>
                <Col span={8}>
                </Col>
            </Row>

            <Row gutter={24}>

                <Col span={12}>
                    {/* <Link to ={`/home/colegios/${colegio}/estudiantes/${estudiante}-${username}/${game}/sesiones`}> */}
                        <div className="content-menu__card" onClick={selectLevelModal}>
                            <div className="content-menu__card__imagen">
                                <img src={Nivel}/>
                            </div>
                            <div className="content-menu__card__op">
                                <span>Nivel</span>
                            </div>
                        </div>
                    {/* </Link> */}
                </Col>

                <Col span={12}>
                    <div className="content-menu__card" onClick={recomendacionModal}>
                        <div className="content-menu__card__imagen">
                            <img src={Consejo}/>
                        </div>
                        <div className="content-menu__card__op">
                            <span>Recomendaciones</span>
                        </div>
                    </div>
                </Col>

                {/* <Col span={8}>
                    <div className="content-menu__card">
                        <div className="content-menu__card__imagen">
                            <img src={Grafico}/>
                        </div>
                        <div className="content-menu__card__op">
                            <span>Puntaje Global</span>
                        </div>
                    </div>
                </Col> */}

            </Row>
        </div>
    );

}