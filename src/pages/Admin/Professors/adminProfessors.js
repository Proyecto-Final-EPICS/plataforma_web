//Liberias
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

//Componentes
import LayoutAdminContext from '../../../components/Admin/LayoutAdminContext';
import TableProfessor from '../../../components/Admin/TableProfessor';
import ProfessorProfile from '../../../components/Admin/ProfessorProfile';
import Modal from '../../../components/General/Modal';

//API
import { getProfessorsApi } from '../../../api/admin';

//Estilos
import './AdminProfessor.scss';

export default function AdminProfessors() {
    // const {setMenuSelectedKey} = props;
    const {setMenuSelectedKey, setProfessorFilter} = useContext(LayoutAdminContext);

    const [professors, setProfessors] = useState([]);
    const [reloadProfessors, setReloadProfessors] = useState(false);

    const [isVisibleModalProfessor, setIsVisibleModalProfessor] = useState(false);
    const [modalProfessorContent, setModalProfessorContent] = useState(null);
    
    const seeProfessor = username => {
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
            
            const onClickCourses = () => {
                setMenuSelectedKey("/admin/courses");
                setProfessorFilter([`${prof.firstname} ${prof.lastname}`]);
            }

            setModalProfessorContent(
                <>
                <ProfessorProfile {...data}/>
                <Link to="/admin/courses">
                    <Button 
                        type="primary" 
                        className="modal-professor__courses"
                        onClick={onClickCourses}
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