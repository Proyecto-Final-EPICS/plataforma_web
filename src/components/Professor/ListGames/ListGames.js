import { Link } from 'react-router-dom';
import { List } from 'antd';

import './ListGames.scss';
import { parseName } from '../../../libraries/General/utils';

export default function GameStore(props) {
    const { games } = props;

    return (
        <List
            className='professor-list-games'
            itemLayout="vertical"
            size="large"
            // pagination={{
            //     pageSize: 3,
            // }}
            dataSource={games}
            renderItem={Game}
            bordered
        />
    );
}

function Game(props) {
    const { code, name, shortDescription, devs, topic, logo } = props;
    const linkTo = `/games/${code}`

    return (
        <List.Item
            key={code}
            actions={[`Tópico: ${topic}`]}
            extra={
                <Link to={linkTo}>
                <img
                    width={100}
                    alt={`Logo de ${name}`}
                    src={logo}
                />
                </Link>
            }
        >
            <List.Item.Meta
                title={<Link to={linkTo}>{name}</Link>}
                description={`Por: ${devs.map(({ firstname, lastname }) => (
                    parseName(firstname, lastname)
                )).join(', ')}`}
            />
            {shortDescription}
        </List.Item>
    )
}
