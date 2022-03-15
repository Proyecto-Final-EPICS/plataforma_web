import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Layout} from 'antd';

import './GridApps.scss';

const {Header, Content} = Layout;

export default function GridApps (props) {
    const {apps} = props;
    
    return(
        <div className="grid-apps">
        <ul className="grid-apps__list">
            {apps.map((app, index) => {
                const {name, code, developers, logo} = app;
                return (
                    <li key={index} className="grid-apps__list__game">
                        {/* <div> */}
                        <Link to={`/admin/apps/details?app=${code}`}>
                            <img src={logo} alt={`Logo de ${name}`}></img>
                        </Link>
                        <Link to={`/admin/apps/details?app=${code}`}>
                            <h1>{name}</h1>
                        </Link>
                        <h2>{`Por: ${developers.map(d => d.student).join(', ')}`}</h2>
                        {/* <h2>{`Nivel requerido: ${levelReq}`}</h2> */}
                        {/* </div> */}
                    </li>
                );
            })}
        </ul>
        </div>
    )
}
