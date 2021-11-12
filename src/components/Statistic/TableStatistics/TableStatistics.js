import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import TableStudents from '../TableStudents';
import TableCourses from '../TableCourses';

import qs from 'query-string';

export default function TableStatistics(props) {
    const {query, data} = props;
    const [courses, students] = data;
    
    return(
        <>
        {query.elem === 'cur' ?
        <TableCourses query={query} courses={courses}/> :
        <TableStudents query={query} students={students}/>
        }
        </>
    );
}

