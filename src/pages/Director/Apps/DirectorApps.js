//Liberias
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';

//Componentes
import GridApps from '../../../components/Director/GridApps';

//API
// import { getVideogamesApi } from '../../../../api/director';
import appsApi from './../../../mock_data/collections/app.json';

//Estilo
import './DirectorApps.scss'

export default function DirectorApps() {
    const { Content } = Layout;
    const [apps, setApps] = useState([]);

    useEffect(() => {
        setApps(appsApi);
    }, []);
    
    return (
        <Layout className='director-apps-home'>
            <Content className='director-apps-home__content'>
                <GridApps apps={apps}/>
            </Content>
        </Layout>
    );
}
