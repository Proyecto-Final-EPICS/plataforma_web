import {useEffect} from 'react';

import './ProfessorProfile.scss';

export default function ProfessorProfile (props) {
    // console.log(props);
    // const {firstname, lastname, degrees, phone, email, description, photo} = props;
    const {firstname, lastname, email} = props;
    
    const description = `
    El pan, del latín panis, es un alimento básico que forma parte de la dieta tradicional en Europa, 
    Medio Oriente, India, América y Oceanía. Se suele preparar mediante el horneado de una masa, elaborada 
    fundamentalmente con harina de cereal, agua y sal.
    `;
    const photo = `
    https://randomuser.me/api/portraits/${Math.random()>0.5?'':'wo'}men/${parseInt(Math.random()*100)}.jpg
    `;
    // const photo = `https://randomuser.me/api/portraits/men/99.jpg`;
    const degrees = ['Pedagogía y Docencia', 'Doctorado en Procesos de Formación en Espacios Virtuales'];
    const phone = {
        countryCode: '57',
        number: '302 19842204'
    };

    return (
        <div className="profile">
            <div className="profile__header">
                <img src={photo}/>
                <h1 className="title">{firstname+' '+lastname}</h1>
            </div>
            {degrees.map((deg, index) => (
                <h2 className="title" key={index}>{deg}</h2>
            ))}
            <h3 className="title">{email}</h3>
            <br/>
            <h3 className="title">{`${phone.countryCode} ${phone.number}`}</h3>
            <p>{description}</p>
        </div>
    )

}