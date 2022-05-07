import { useState } from 'react';
import {Link} from 'react-router-dom';

import './GridCourses.scss';

export default function GridCourses(props) {
    const { courses } = props;

    return (
        <ul className="professor-courses">
            {courses.map(({code, name, level}, i) => (
                <li className="professor-courses__el" key={i}>
                    {/* <div> */}
                    <Link to={`/home/${code}`}>
                        <div className='professor-courses__el__name'>
                            {/* <h1>{`${String(i+1).length==1?'0':''}${String(i+1)}. ${name}`}</h1> */}
                            <h1>{name}</h1>
                        </div>
                        <div className='professor-courses__el__desc'>
                            <span>
                                <div>
                                    <b>Código: </b><p>{code}</p>
                                </div>
                                <div>
                                    <b>Nivel requerido: </b><p>{level}</p>
                                </div>
                                {/* <h2>{`${code} • ${level}`}</h2> */}
                            </span>
                        </div>
                    </Link>
                    {/* </div> */}
                </li>
            ))}
        </ul>
    );
}
