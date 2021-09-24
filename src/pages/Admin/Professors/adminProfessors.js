//Liberias
import { useState, useEffect } from 'react';
import { Layout, Button, Table } from 'antd';

//Componentes
// import ListProfessors from '../../../components/Admin/ListProfessor';
import TableProfessor from '../../../components/Admin/TableProfessor';
import AddProfessorForm from '../../../components/Admin/Forms/AddProfessorForm';
import ProfessorProfile from '../../../components/Admin/ProfessorProfile';
import Modal from '../../../components/Modal';

//API
import { getProfessorsApi } from '../../../api/admin';

//Estilos
import './AdminProfessor.scss';

export default function AdminProfessors() {

    const { Content, Header } = Layout;
    
    const selectedProfessor = null;
    const [professors, setProfessors] = useState([]);
    const [reloadProfessors, setReloadProfessors] = useState(false);

    const [isVisibleModalAddProfessor, setIsVisibleModalAddProfessor] = useState(false);
    const [modalAddProfessorTitle, setModalAddProfessorTitle] = useState('Agregar profesor');
    const [modalAddProfessorContent, setModalAddProfessorContent] = useState(null);

    const [isVisibleModalProfessor, setIsVisibleModalProfessor] = useState(false);
    const [modalProfessorContent, setModalProfessorContent] = useState(null);

    const addProfessor = () => {
        setIsVisibleModalAddProfessor(true);
        setModalAddProfessorContent(
            <AddProfessorForm
                setIsVisibleModal = {setIsVisibleModalAddProfessor}
                setReloadProfessors = {setReloadProfessors}
            />
        )
    }
    
    const seeProfessor = (username) => {
        console.log(username);
        return;
        setIsVisibleModalProfessor(true);
        setModalProfessorContent(
            <ProfessorProfile
                setIsVisibleModal={setIsVisibleModalProfessor}
                
            >
            </ProfessorProfile>
        );
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
                title={modalAddProfessorTitle}
                isVisible={isVisibleModalAddProfessor}
                setIsVisible={setIsVisibleModalAddProfessor}
            >
                {modalAddProfessorContent}
            </Modal>
            <Modal
                isVisible={isVisibleModalProfessor}
                setIsVisible={setIsVisibleModalProfessor}
            >
                {modalProfessorContent}
            </Modal>

            <div className="admin-colegio-contenido">
                <Button type="primary" className="professor__button" onClick={addProfessor}>
                    Registrar
                </Button>
                <Content>
                    <TableProfessor
                        professors={professors} 
                        seeProfessor={seeProfessor} 
                    />
                </Content>
            </div>
        </Layout>
    );
}