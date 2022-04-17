import TableStudents from '../TableStudents';
import TableCourses from '../TableCourses';

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

