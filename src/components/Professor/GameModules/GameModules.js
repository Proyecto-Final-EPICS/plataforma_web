import { useState } from 'react';

import './GameModules.scss';

export default function GameModules(props) {
  const { modules } = props;

  return (
    <div className='professor-game-modules'>
      <div className='professor-game-modules__title'>Módulos</div>
      <ul className='professor-game-modules__content'>
          {modules.map(({id, topic, img}) => (
            <li key={id}>
              <img 
                src={img} 
                alt={`Logo de módulo ${topic}`}
                width={100}
              />
              {topic}
            </li>
          ))}
      </ul>
    </div>
  )
}