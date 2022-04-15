import { Link } from 'react-router-dom';
import qs from 'query-string';

import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

export default function ListGames(props) {
    const {games} = props;
    const query = qs.parse(window.location.search)

    const queryGame = code => {
        return {
            pathname: '/home/apps/details',
            search: qs.stringify({
                ...query,
                game: code,
            })
        }
    }

    const renderGame = game => {
        const {code, name, shortDescription, developers, levelReq} = game;
        const devs = developers.map(d => d.student);

        return (
            <List.Item
                key={code}
                actions={[
                    <div>{`Level: ${levelReq}`}</div>,
                ]}
                extra={
                    <Link to={() => queryGame(code)}>
                    <img
                        width={100}
                        alt={`Logo de ${name}`}
                        src="https://cdn.pixabay.com/photo/2016/12/23/07/00/game-1926906_960_720.png"
                    />
                    </Link>
                }
            >
                <List.Item.Meta
                    title={<Link to={() => queryGame(code)}>{name}</Link>}
                    description={`Por: ${devs.join(', ')}`}
                />
                {shortDescription}
            </List.Item>
        )
    }

    return (
        <List
            itemLayout="vertical"
            size="large"
            // pagination={{
            //     pageSize: 3,
            // }}
            dataSource={games}
            renderItem={renderGame}
            bordered
        />
    );
}
