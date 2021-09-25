//Liberias
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

//Componentes
// import ListProfessors from '../../../components/Admin/ListProfessor';
import TableProfessor from '../../../components/Admin/TableProfessor';
import ProfessorProfile from '../../../components/Admin/ProfessorProfile';
import Modal from '../../../components/Modal';

//API
import { getProfessorsApi } from '../../../api/admin';

//Estilos
import './AdminProfessor.scss';

export default function AdminProfessors(props) {
    const {setMenuSelectedKey} = props;

    const [professors, setProfessors] = useState([]);
    const [reloadProfessors, setReloadProfessors] = useState(false);

    const [isVisibleModalProfessor, setIsVisibleModalProfessor] = useState(false);
    const [modalProfessorContent, setModalProfessorContent] = useState(null);
    
    const seeProfessor = (username) => {
        setIsVisibleModalProfessor(true);
        getProfessorsApi().then(response => {
            const prof = response.find(el => el.username==username);
            const data = {
                firstname: prof.firstname,
                lastname: prof.lastname,
                photo: prof.photo,
                degree: prof.degrees,
                phone: prof.phone,
                email: prof.email,
                description: prof.description
            };
            setModalProfessorContent(
                <>
                <ProfessorProfile {...data}/>
                <Link to="/admin/courses">
                    <Button 
                        type="primary" 
                        className="modal-professor__courses"
                        onClick={() => setMenuSelectedKey("/admin/courses")}
                    >
                        Cursos
                    </Button>
                </Link>
                <Link to="/admin/games">
                    <Button 
                        type="primary" 
                        className="modal-professor__games"
                        onClick={() => setMenuSelectedKey("/admin/games")}
                    >
                        Juegos
                    </Button>
                </Link>
                </>
            );
        })
    }

    useEffect(() => {
        getProfessorsApi().then(response => {
            setProfessors(response.map(el => {
                const {username, lastname, firstname, email} = el;
                return {username, lastname, firstname, email};
            }));
            setReloadProfessors(false);
        })
    }, [reloadProfessors]);
    
    return (
        <div>
            <Modal
                // style={{ height: 'calc(100vh - 200px)' }}
                // bodyStyle={{ overflowY: 'scroll' }}
                isVisible={isVisibleModalProfessor}
                setIsVisible={setIsVisibleModalProfessor}
            >
                {modalProfessorContent}
            </Modal>

            <div className="admin-colegio-contenido">
            <TableProfessor
                professors={professors} 
                seeProfessor={seeProfessor} 
            />
            </div>
        </div>
    );
}