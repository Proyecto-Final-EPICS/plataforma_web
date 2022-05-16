//Liberias
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import qs from 'query-string';
import { Button } from 'antd';

//Componentes
import TableCourses from '../../../components/Director/TableCourses';

import courseApi from '../../../mock_data/collections/course.json'

//Estilos
import './DirectorCourses.scss';
import useAuth from '../../../hooks/useAuth';

export default function DirectorCourses() {
    const [courses, setCourses] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const { school } = useAuth();
    
    const redirectStatistics = () => {
        const query = {cur: []};
        selectedRowKeys.forEach(el => query.cur.push(courses[el].code));
        
        return {
            pathname: '/statistics',
            search: qs.stringify(query),
        }
    }

    useEffect(() => {
        setCourses(courseApi.filter(c => c.school == school));
    }, []);

    return (
        <div className='director-courses'>
            <div className='director-courses__title'>Cursos</div>
            <TableCourses 
                courses={courses}
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
            />
            <Link
                to={redirectStatistics}
                target="_blank" 
                referrerPolicy="no-referrer"
            >
            <Button
                className='button-purple' 
                disabled={!selectedRowKeys.length}
                type="primary" 
            >
                Ver Estadísticas
            </Button>
            </Link>
        </div>
    );
}
