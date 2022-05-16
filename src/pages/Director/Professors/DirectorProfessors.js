//Liberias
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

//Componentes
import TableProfessors from '../../../components/Director/TableProfessors';
import ProfessorProfile from '../../../components/Director/ProfessorProfile';
import Modal from '../../../components/General/Modal';

import professorApi from '../../../mock_data/collections/professor.json'

//Estilos
import './DirectorProfessors.scss';

export default function DirectorProfessors() {
    const [professors, setProfessors] = useState([]);
    const [reloadProfessors, setReloadProfessors] = useState(false);

    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    
    const seeProfessor = username => {
        const professor = professors.find(p => p.username == username);
        setModalContent(<ProfessorProfile professor={professor}/>);
        setIsVisibleModal(true);
    }

    useEffect(() => {
        setProfessors(professorApi);
    }, []);
    
    return (
        <div className="director-professors">
            <div className='director-professors__title'>Profesores</div>
            <Modal
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>

            <TableProfessors
                professors={professors} 
                seeProfessor={seeProfessor} 
            />
        </div>
    );
}
