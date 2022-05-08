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
          renderItem={({name, code, logo, devs, topics, skills}, i) => (
              <Link key={i} to={`/games/${code}`}>
                <List.Item className='professor-list-games__el'>
                    <List.Item.Meta
                      avatar={<Avatar src={logo} />}
                      title={name}
                      description={<GameDescription devs={devs} topics={topics} skills={skills}/>}
                    />
                </List.Item>
              </Link>
            )}
        />
    );
}

function GameDescription(props) {
  const { devs, topics, skills } = props;
  
  return (
    <>
      <div>
        <b>Por:</b><span>{' ' + devs.map(d => d.type == 'student'? d.student:d.name).join(', ')}</span>
      </div>
      <div><b>Tópicos:</b><span>{' ' + topics.join(', ')}</span></div>
      <div><b>Skills:</b><span>{' ' + skills.join(', ')}</span></div>
    </>
  );
}
