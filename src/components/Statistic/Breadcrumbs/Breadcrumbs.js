//Librerías
import React from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { Link } from 'react-router-dom';
import {CaretRightOutlined } from '@ant-design/icons';


//Estilos 
import './Breadcrumbs.scss';


// const Breadcrumbs = ({breadcrumbs}) =>  (
//     <div className="breadcrumbs">
//         {breadcrumbs.map(({ breadcrumb, match }, index) => (
//             <div className="bc" key={match.url}>
//                 <Link to={match.url}>{ breadcrumb }</Link>
//                 {index < breadcrumbs.length - 1 && " ► "}
//             </div>
//          ))}

//     </div>

// );

function Breadcrumbs(breadcrumbs){
    return(
        <div className="breadcrumbs">
            <LoadBreadcrumbs breadcrumbs={breadcrumbs}/>
        </div>
    );
}


function LoadBreadcrumbs(breadcrumbs){
    const bcs = breadcrumbs.breadcrumbs.breadcrumbs;
    bcs.splice(0,1);
    
  
    return(
        <div className="breadcrumbs">
            {bcs.map(({ breadcrumb, match }, index) => (
            <div className="bc" key={match.url}>
                <Link to={match.url}>{ breadcrumb }</Link>
                {index < bcs.length - 1 && <CaretRightOutlined />}
            </div>
            ))}
        </div>



    );

 
}


export default withBreadcrumbs()(Breadcrumbs);