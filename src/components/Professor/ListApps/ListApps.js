import { useState } from 'react';
import { Link } from 'react-router-dom';

import { List, Avatar } from 'antd';

import './ListApps.scss';

export default function ListApps(props) {
    const {apps, height} = props;

    return (
        <List
            itemLayout="horizontal"
            dataSource={apps}
            height={height}
            renderItem={app => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={app.logo} />}
                    title={<Link>{app.name}</Link>}
                    description={`Por: ${app.developers.map(d => d.student).join(', ')}`}
                  />
                </List.Item>
              )}
        >
        
        </List>
    );
}
