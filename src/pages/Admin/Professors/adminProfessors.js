//Liberias
import { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';

//Componentes
import ListProfessors from '../../../components/Admin/ListProfessor';
import AddProfessorForm from '../../../components/Admin/Forms/AddProfessorForm';
import Modal from '../../../components/Modal';

//API
import { getProfessorsApi } from '../../../api/admin';

//Estilos
import './AdminProfessor.scss';

export default function AdminProfessors() {

    const { Content, Header } = Layout;
    
    const colegio = 'NombreColegio'; //xddd
    const [professors, setProfessors] = useState([]);
    const [reloadProfessors, setReloadProfessors] = useState(false);

    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);
    
    const addProfessor = () =>{
        setIsVisibleModal(true);
        setModalTitle(`Agregar profesor`);
        setModalContent(
            <AddProfessorForm
                colegio = {colegio}
                setIsVisibleModal = {setIsVisibleModal}
                setReloadProfessors = {setReloadProfessors}
            />
        )
    }
    
    useEffect(() => {
        getProfessorsApi().then(response => {
            setProfessors(response);
            setReloadProfessors(false);
        })
    }, [reloadProfessors]);
    
    return (
        <Layout>
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>

            <div className="admin-colegio-contenido">
                <Button type="primary" className="professor__button" onClick={addProfessor}>
                    Registrar
                </Button>
                <Content>
                    <Header className="admin-professor-contenido__header">
                        <div className="admin-professor-contenido__header__col">
                            <h1>Nombre</h1>
                        </div>

                        <div className="admin-professor-contenido__header__col">
                            <h1>Editar</h1>
                        </div>
                    </Header>
                    <ListProfessors profesores={professors} />
                </Content>
            </div>
        </Layout>
    );
}