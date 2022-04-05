import { useState } from 'react';
import { Link } from 'react-router-dom';

import { List, Avatar } from 'antd';

import './ListActivities.scss';

export default function ListActivities(props) {
    const {activities} = props;

    return (
        <List
          className='professor-activities'
          itemLayout="horizontal"
          dataSource={activities}
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
