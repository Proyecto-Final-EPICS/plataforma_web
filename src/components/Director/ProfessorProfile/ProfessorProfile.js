import { useContext } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import DirectorContext from '../../../components/Director/DirectorContext';

import './ProfessorProfile.scss';

export default function ProfessorProfile (props) {
    const { professor: { firstname, lastname, photo, phone, email, 
        curriculum: { degrees, description } } } = props;

    const { setMenuSelectedKey } = useContext(DirectorContext);

    console.log(lastname);

    return (
        <div className="director-professor-profile">
            <div className="director-professor-profile__header">
                <img src={photo}/>
                <h1 className="title">{firstname+' '+lastname}</h1>
            </div>

            <div className='director-professor-profile__degrees' >
                {degrees.map((deg, index) => (
                    <h2 className="title" key={index}>{deg}</h2>
                ))}
            </div>

            <h3 className="director-professor-profile__email">{email}</h3>
            <br/>
            <h3 className="director-professor-profile__phone">
                {`+${phone.countryCode} ${phone.number}`}
            </h3>
            <p className="director-professor-profile__desc">{description}</p>

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