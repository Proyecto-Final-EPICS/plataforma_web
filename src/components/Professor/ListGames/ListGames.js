//Liberias
import React,{useState} from 'react';
import {List,Button,Card} from 'antd';
import {Link,useParams} from 'react-router-dom';

//Componentes
import Modal from '../../../components/Modal';
import GameDetailsList from '../../../components/Professor/GameDetailsList';
import GameRanking from '../../../components/Professor/GameRanking';

//Estilos
import './ListGames.scss';

export default function ListGames(props){
    const {juegos} = props;
    const [reload,setReload] = useState(false);

    //Constantes para el modal
    const [isVisibleModal,setIsVisibleModal] = useState(false);
    const [modalTitle,setModalTitle] = useState("");
    const [modalContent,setModalContent] = useState(null);


    return(
        <div className="list-juegos">
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
             >
             {modalContent}
            </Modal>

            <Juegos 
                juegos={juegos.name}
                setIsVisibleModal={setIsVisibleModal}
                setModalTitle={setModalTitle}
                setModalContent={setModalContent}
                reload={reload}
                setReload={setReload}
            />
        </div>
    );
}

function Juegos(props){
    const {juegos,setIsVisibleModal,setModalTitle,setModalContent,reload,setReload} = props;
   
    return(
        
        <List
            grid={{gutter: 16, column: 1}}
            className= "juegos"
            itemLayout= "horizontal"
            dataSource={juegos}
            renderItem={juego => <Juego
                juego = {juego}
                setIsVisibleModal={setIsVisibleModal}
                setModalTitle={setModalTitle}
                setModalContent={setModalContent}
                reload={reload}
                setReload={setReload}
            />}
        />
    );
}

function Juego(props){
    const {juego,setIsVisibleModal,setModalTitle,setModalContent,reload,setReload} = props;
    const {colegio} = useParams();

    const detalles = () =>{
        setIsVisibleModal(true);
        setModalTitle("Objetivos");
        setModalContent(
            <GameDetailsList
                juego={juego}
                reload={reload}
            />
        )
        setReload(!reload);
    }
    

    const ranking = () =>{
        setIsVisibleModal(true);
        setModalTitle("Ranking");
        setModalContent(
            <GameRanking
                juego={juego}
                reload={reload}
            />
        )
        setReload(!reload);
    }

    return(
        <Card className="card-juegos">
            <List.Item
                actions={[
                    <div className="card-juegos__content">
                        <h1 className="card-juegos__content__title">
                            {juego.name}
                        </h1>

                        <h1 className="card-juegos__content__title">
                            {juego.topic}
                        </h1>
        
                        {/* <Link to ={`/home/colegios/${colegio}/juegos/${juego.name}/detalles`}> */}
                            <Button type="primary" className="card-juegos__button" onClick={detalles} > 
                                Detalles
                            </Button> 
                        {/* </Link> */}

                        {/* <Link to ={`/home/colegios/${colegio}/juegos/${juego.name}/ranking`}> */}
                            <Button type="primary" className="card-juegos__button" onClick={ranking}> 
                                Ranking
                            </Button> 
                        {/* </Link> */}

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