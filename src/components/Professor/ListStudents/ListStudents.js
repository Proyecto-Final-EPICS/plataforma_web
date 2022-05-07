import { useState } from 'react';
import { Link } from 'react-router-dom';

import { List, Avatar } from 'antd';

import './ListStudents.scss';

export default function ListStudents(props) {
    const {students} = props;

    return (
        <List
          className='professor-students'
          itemLayout="horizontal"
          dataSource={students}
          renderItem={({firstname, lastname, username, photo}, i) => (
              <List.Item className='professor-students__el' key={i}>
                <List.Item.Meta
                  avatar={<Avatar src={photo} />}
                  title={<Link>{`${firstname} ${lastname}`}</Link>}
                  description={username}
                />
              </List.Item>
            )}
        />
    );
}
