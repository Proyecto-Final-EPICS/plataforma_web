import { useContext } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import DirectorContext from '../../../components/Director/DirectorContext';

import './ProfessorProfile.scss';

export default function ProfessorProfile (props) {
    const { professor: { firstname, lastname, photo, phone, email, courses } } = props;

    // const { setMenuSelectedKey } = useContext(DirectorContext);

    return (
        <div className="director-professor-profile">
            <div className="director-professor-profile__header">
                <img src={photo}/>
                <h1 className="title">{firstname+' '+lastname}</h1>
            </div>

            <div><h2>Departmento</h2></div>
            {/* 
            <div className='director-professor-profile__degrees' >
                {courses.map((course, index) => (
                    <h2 className="title" key={index}>{course.name}</h2>
                ))}
            </div> */}

            <h3>{email}</h3><br/>
            <h3>{`+${phone.country_code} ${phone.number}`}</h3><br/>
            <h4>Cursos: {courses.map(c => c.code).join(', ')}</h4><br/>
            {/* <p className="director-professor-profile__desc">{description}</p> */}

            <div className='director-professor-profile__options'>
                <Link>
                    <Button 
                        className='button-purple'
                        type="primary" 
                        // className="director-professor-profile__options"
                    >
                        Cursos
                    </Button>
                </Link>
                <Link>
                    <Button 
                        className='button-purple'
                        type="primary" 
                        // className="director-professor-profile__options"
                    >
                        Juegos
                    </Button>
                </Link>
            </div>
        </div>
    )

}