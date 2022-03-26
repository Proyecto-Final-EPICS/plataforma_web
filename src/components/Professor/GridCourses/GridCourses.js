import { useState } from 'react';
import {Link} from 'react-router-dom';

import './GridCourses.scss';

export default function GridCourses(props) {
    const {courses} = props;

    return (
        <ul className="grid-courses">
            {courses.map(c => (
                <li className="grid-courses__el">
                    <Link>
                        <h1>{c.name}</h1>
                        <span>
                            <h2>{c.code}</h2>
                            <h2>{c.level}</h2>
                            <h2>{c.period}</h2>
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
