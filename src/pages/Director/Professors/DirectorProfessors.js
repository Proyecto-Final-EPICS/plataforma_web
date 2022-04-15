//Liberias
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

//Componentes
import DirectorContext from '../../../components/Director/DirectorContext';
import TableProfessor from '../../../components/Director/TableProfessor';
import ProfessorProfile from '../../../components/Director/ProfessorProfile';
import Modal from '../../../components/General/Modal';

//API
import { getProfessorsApi } from '../../../api/director';

//Estilos
import './DirectorProfessors.scss';

export default function DirectorProfessors() {
    // const {setMenuSelectedKey} = props;
    const {setMenuSelectedKey} = useContext(DirectorContext);

    const [professors, setProfessors] = useState([]);
    const [reloadProfessors, setReloadProfessors] = useState(false);

    const [isVisibleModalProfessor, setIsVisibleModalProfessor] = useState(false);
    const [modalProfessorContent, setModalProfessorContent] = useState(null);
    
    const seeProfessor = username => {
        
        setIsVisibleModalProfessor(true);
        
        getProfessorsApi().then(response => {
            const {firstname, lastname, photo, phone, curriculum, email} 
                = response.find(el => el.username==username);

            const data = {firstname, lastname, photo, phone, curriculum, email};
            
            const onClickCourses = () => {
                setMenuSelectedKey('/home/courses');
                // setProfessorFilter([`${prof.firstname} ${prof.lastname}`]);
            }

            setModalProfessorContent(
                <div className='director-professor-modal'>
                    <ProfessorProfile {...data}/>
                    <div className='director-professor-modal__options'>
                        <Link to={`/home/courses?professors=${firstname} ${lastname}`}>
                            <Button 
                                type="primary" 
                                className="modal-professor__courses"
                                onClick={onClickCourses}
                            >
                                Cursos
                            </Button>
                        </Link>
                        <Link to="/home/games">
                            <Button 
                                type="primary" 
                                className="modal-professor__games"
                                onClick={() => setMenuSelectedKey("/home/games")}
                            >
                                Juegos
                            </Button>
                        </Link>
                    </div>
                </div>
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
        <div className="director-professors">
            <Modal
                // style={{ height: 'calc(100vh - 200px)' }}
                // bodyStyle={{ overflowY: 'scroll' }}
                isVisible={isVisibleModalProfessor}
                setIsVisible={setIsVisibleModalProfessor}
            >
                {modalProfessorContent}
            </Modal>

            <div className="director-professors__content">
            <TableProfessor
                professors={professors} 
                seeProfessor={seeProfessor} 
            />
            </div>
        </div>
    );
}
