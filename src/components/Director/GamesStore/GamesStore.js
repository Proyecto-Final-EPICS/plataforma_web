import { Link } from 'react-router-dom';
// import qs from 'query-string';

import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

export default function GamesStore(props) {
    const { games, myGames } = props;
    // const query = qs.parse(window.location.search)

    // const queryGame = code => {
    //     return {
    //         pathname: '/home/apps/details',
    //         search: qs.stringify({
    //             ...query,
    //             game: code,
    //         })
    //     }
    // }

    return (
        <List
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
    const { code, name, shortDescription, devs, level, logo } = props;

    return (
        <List.Item
            key={code}
            actions={[
                <div>{`Level: ${level}`}</div>,
            ]}
            extra={
                // <Link to={() => queryGame(code)}>
                <img
                    width={100}
                    alt={`Logo de ${name}`}
                    src={logo}
                />
                // </Link>
            }
        >
            <List.Item.Meta
                // title={<Link to={() => queryGame(code)}>{name}</Link>}
                title={name}
                description={`Por: ${devs.join(', ')}`}
            />
            {shortDescription}
        </List.Item>
    )
}
