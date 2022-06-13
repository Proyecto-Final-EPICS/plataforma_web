//Liberias
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

//Componentes
import TableProfessors from '../../../components/Director/TableProfessors';
import ProfessorProfile from '../../../components/Director/ProfessorProfile';
import Modal from '../../../components/General/Modal';

import { getProfessorsFromSchool } from '../../../api/professor';
import useAuth from '../../../hooks/useAuth';

//Estilos
import './DirectorProfessors.scss';

export default function DirectorProfessors() {
    const [professors, setProfessors] = useState([]);
    const [reloadProfessors, setReloadProfessors] = useState(false);

    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const { id_school } = useAuth();
    
    const seeProfessor = username => {
        const professor = professors.find(p => p.username == username);
        setModalContent(<ProfessorProfile professor={professor}/>);
        setIsVisibleModal(true);
    }

    useEffect(() => {
        getProfessorsFromSchool(id_school).then(json => setProfessors(json));
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
