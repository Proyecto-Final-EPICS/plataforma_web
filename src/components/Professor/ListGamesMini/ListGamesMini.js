import { Link } from 'react-router-dom';
import { List, Avatar } from 'antd';

import { parseName } from '../../../libraries/General/utils';

import './ListGamesMini.scss';

export default function ListGamesMini(props) {
    const { games } = props;
    
    return (
        <List
          className='professor-list-games-mini'
          itemLayout="horizontal"
          dataSource={games}
          renderItem={({ name, code, logo, devs, topic }, i) => (
              <Link key={i} to={`/games/${code}`}>
                <List.Item className='professor-list-games-mini__el'>
                    <List.Item.Meta
                      avatar={<Avatar src={logo} />}
                      title={name}
                      description={<GameDescription devs={devs} topic={topic}/>}
                    />
                </List.Item>
              </Link>
            )}
        />
    );
}

function GameDescription(props) {
  const { devs, topic } = props;
  
  return (
    <>
      <div>
        <b>Por: </b><span>{devs.map(d => parseName(d.firstname, d.lastname)).join(', ')}</span>
      </div>
      <div><b>Tópico: </b><span>{topic}</span></div>
    </>
  );
}
