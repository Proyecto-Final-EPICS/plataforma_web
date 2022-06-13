import { useContext } from 'react';

import TableStudents from '../TableStudents';
import TableCourses from '../TableCourses';

import StatisticHomeContext from '../StatisticHomeContext';

export default function TableStatistics(props) {
    const { data } = props;
    const { query } = useContext(StatisticHomeContext);
    console.log(data);
    
    return(
        <>
        {query.elem === 'cur' ?
        <TableCourses courses={data}/> :
        <TableStudents students={data}/>
        }
        </>
    );
}

