import { useState } from 'react';
import { Link } from 'react-router-dom';

import { List, Avatar } from 'antd';

import './ListApps.scss';

export default function ListApps(props) {
    const {apps, height} = props;

    return (
        <List
          className='professor-apps'
          itemLayout="horizontal"
          dataSource={apps}
          height={height}
          renderItem={(app, i) => (
              <List.Item className='professor-apps__el' key={i}>
                <List.Item.Meta
                  avatar={<Avatar src={app.logo} />}
                  title={<Link>{app.name}</Link>}
                  description={`Por: ${app.developers.map(d => d.student).join(', ')}`}
                />
              </List.Item>
            )}
        />
    );
}
