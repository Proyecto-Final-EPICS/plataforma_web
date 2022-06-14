import { useContext, useState, useEffect } from 'react';

import AdminContext from '../../../components/Admin/AdminContext';

import { getSchool } from '../../../api/school';

import './AdminSchool.scss';
import { parseLocation, parsePhone } from '../../../libraries/General/utils';

export default function AdminSchool(props) {

    const { school: id_school } = useContext(AdminContext);

    const [school, setSchool] = useState(null);

    useEffect(() => (
        getSchool(id_school).then(json => setSchool(json))
    ), []);

    return school ? (
        <>
            {/* <div>{school.id_school}</div>
            <div>{school.school_name}</div>
            <div>{parsePhone(school.contact_phone)}</div>
            <div>{parseLocation(school.location)}</div> */}
        </>
    ) : null;
}
