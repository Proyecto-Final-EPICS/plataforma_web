import { useState } from 'react';
import {Link} from 'react-router-dom';

import './GridCourses.scss';

export default function GridCourses(props) {
    const {courses} = props;

    return (
        <ul className="professor-courses">
            {courses.map((c, i) => (
                <li className="professor-courses__el" key={i}>
                    <Link>
                        <h1>{`${String(i+1).length==1?'0':''}${String(i+1)}. ${c.name}`}</h1>
                        <span>
                            <h2>{`${c.code} - ${c.level} - ${c.period}`}</h2>
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
