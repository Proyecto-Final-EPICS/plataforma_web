import { useState } from 'react';
import { Link } from 'react-router-dom';

import { List, Avatar } from 'antd';

import './ListGames.scss';

export default function ListGames(props) {
    const { games } = props;

    return (
        <List
          className='professor-list-games'
          itemLayout="horizontal"
          dataSource={games}
          renderItem={({name, logo, devs, topics, skills}, i) => (
              <List.Item className='professor-list-games__el' key={i}>
                <List.Item.Meta
                  avatar={<Avatar src={logo} />}
                  title={<Link>{name}</Link>}
                  description={<GameDescription devs={devs} topics={topics} skills={skills}/>}
                />
              </List.Item>
            )}
        />
    );
}

function GameDescription(props) {
  const { devs, topics, skills } = props;

  return (
    <>
      <div className='professor-list-games__el__devs'>
          <b>Por:</b><p style={{display: 'inline'}}>{' ' + devs.map(d => d.student).join(', ')}</p>
      </div>
      <div className='professor-list-games__el__topics'>
          <b>Tópicos:</b><p style={{display: 'inline'}}>{' ' + topics.join(', ')}</p>
      </div>
      <div className='professor-list-games__el__skills'>
          <b>Skills:</b><p style={{display: 'inline'}}>{' ' + skills.join(', ')}</p>
      </div>
    </>
  );
}
