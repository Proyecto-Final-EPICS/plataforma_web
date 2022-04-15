import {useEffect} from 'react';

import './ProfessorProfile.scss';

export default function ProfessorProfile (props) {
    const {firstname, lastname, photo, phone, curriculum: {degrees, description}, email} = props;
    
    return (
        <div className="director-profesor-profile">
            <div className="director-profesor-profile__header">
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
        </div>
    )

}