//Liberias
import React,{useState,useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {Layout,Button} from 'antd';

//Componentes
import ListStudents from '../../../components/Professor/Estudiantes/ListStudents';
import AddStudentForm from '../../../components/Professor/Forms/AddStudentForm';
import Modal from '../../../components/Modal';


//API
import {getEstudiantesByColegio} from '../../../api/colegio';

//Estilos
import './Colegio.scss';

export default function Colegio(){
    const {colegio} = useParams();
    const [students,setStudents] = useState([]);
    const [reloadStudents,setReloadStudents] = useState(false);
    const {Content,Header} = Layout;
    const col = useLocation().pathname.split("/")[3];

    //Constantes para el modal
    const [isVisibleModal,setIsVisibleModal] = useState(false);
    const [modalTitle,setModalTitle] = useState("");
    const [modalContent,setModalContent] = useState(null);

    useEffect(()=>{
        let isMounted = true;
        getEstudiantesByColegio(colegio).then(response =>{
            setStudents(response);
            setReloadStudents(false)
        })
        return () =>{isMounted = false};
    },[reloadStudents])

    const addStudent = () =>{
        setIsVisibleModal(true);
        setModalTitle(`Agregar estudiante a ${col}`);
        setModalContent(
            <AddStudentForm
                setIsVisibleModal = {setIsVisibleModal}
                colegio = {colegio}
                setReloadStudents={setReloadStudents}
            />
        )
    }

    return(
        <Layout>
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>

            <div className="col-top">
                <div className="col-top__titulo">
                    {col}
                </div>

                <Button className="col-top__button" onClick={addStudent}>
                    Agregar estudiante
                </Button>
            </div>
           
            
            <div className="col-contenido">

                <Header className="col-contenido__header">

                    <div className="col-contenido__header__col">
                        <h1>Nombre</h1>
                    </div>

                    <div className="col-contenido__header__col">
                        <h1>Edad</h1>
                    </div>     

                    <div className="col-contenido__header__col">
                        <h1>Usuario</h1>
                    </div>  

                    {/* <div className="col-contenido__header__col">
                        <h1>Editar</h1>
                    </div>   */}

                    <div className="col-contenido__header__col">
                        <h1>Acción</h1>
                    </div>
                </Header>

                <Content className="col-contenido__content"> 
                    <ListStudents students={students}/>
                </Content>
            </div>
            
        </Layout>
    );
}