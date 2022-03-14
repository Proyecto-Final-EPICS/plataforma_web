import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Layout} from 'antd';

import './GridGame.scss';

const {Header, Content} = Layout;

export default function GridGame (props) {
    const {games} = props;
    
    return(
        <div className="grid-game">
        <ul className="grid-game__list">
            {games.map((game, index) => {
                const {id, shortname, level, developers, image} = game;
                
                return (
                    <li key={index} className="grid-game__list__game">
                        {/* <div> */}
                            <Link to="">
                                <img src={image}></img>
                            </Link>
                            <Link to="">
                                <h1>{shortname}</h1>
                            </Link>
                            <h2>{developers.join(', ')}</h2>
                            <h2>{level}</h2>
                        {/* </div> */}
                    </li>
                );
            })}
        </ul>
        </div>
    )
}
