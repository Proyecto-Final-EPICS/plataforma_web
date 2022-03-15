//Liberias
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';

//Componentes
import GridApps from '../../../components/Admin/GridApps';

//API
// import { getVideogamesApi } from '../../../../api/admin';
import appsApi from './../../../mock_data/collections/app.json';

//Estilo
import './AdminApps.scss'

export default function AdminApps() {
    const { Content } = Layout;
    const [apps, setApps] = useState([]);

    useEffect(() => {
        setApps(appsApi);
    }, []);
    
    return (
        <Layout className='admin-apps-home'>
            <Content className='admin-apps-home__content'>
                <GridApps apps={apps}/>
            </Content>
        </Layout>
    );
}
