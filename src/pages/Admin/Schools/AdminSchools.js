import { useState, useEffect } from 'react';
import TableSchools from '../../../components/Admin/TableSchools';

import schoolApi from '../../../mock_data/collections/school.json';

import './AdminSchools.scss';

export default function AdminSchools(props) {
    const [schools, setSchools] = useState([]);

    useEffect(() => setSchools(schoolApi), []);
    
    return (
        <div className='admin-schools'>
            <TableSchools schools={schools}/>
        </div>
    )
}
