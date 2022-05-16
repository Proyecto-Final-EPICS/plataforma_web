import { useState, useEffect } from 'react';

import { Form, Button, message } from 'antd';
import CheckGroup from '../../../General/Input/CheckGroup/CheckGroup';

import './GameForm.scss';

export default function GameForm(props) {
    const { setModalVisible, games, setGames, otherGames, rem } = props;
    const [selGames, setSelGames] = useState([]);

    const submit = () => {
        if(!selGames.length) return message.error('Por favor, seleccione al menos un juego');

        setGames(rem ? 
            games.filter(g => !selGames.includes(g.code))
            : [...games, ...otherGames.filter(g => selGames.includes(g.code))]
        )
        setModalVisible(false);
    }

    return (
        <Form
            className='professor-game-form'
            layout="vertical"
        >
            <Form.Item className='professor-game-form__games'>
                <CheckGroup
                    options={rem ? games.map(g => g.code) : otherGames.map(g => g.code)}
                    checked={[]}
                    update={(_, list) => setSelGames(list)}
                />
            </Form.Item>
            <Form.Item>
                <Button type='primary' onClick={submit}>{rem ? "Retirar" : "Añadir"}</Button>
            </Form.Item>
        </Form>
    );
}
