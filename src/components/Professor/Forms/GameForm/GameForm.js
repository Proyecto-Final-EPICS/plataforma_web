import { useState } from 'react';

import { Form, Button, message } from 'antd';
import CheckGroup from '../../../General/Input/CheckGroup/CheckGroup';

import { addGamesToCourse, addGameToCourse, delGameFromCourse, delGamesFromCourse } from '../../../../api/game';

import './GameForm.scss';
import { getCourseFromSchool } from '../../../../api/course';

export default function GameForm(props) {
    const { id_school, course_code, setModalVisible, games, setGames, rem } = props;
    const [selGames, setSelGames] = useState([]);

    const submit = () => {
        if(!selGames.length) return message.error('Por favor, seleccione al menos un juego');
        
        const updateGames = () => getCourseFromSchool(id_school, course_code)
            .then(json => setGames(json.games));
        
        if(rem) {
            if(selGames.length == 1)
                delGameFromCourse(id_school, course_code, selGames[0]).then(updateGames);
            else
                delGamesFromCourse(id_school, course_code, selGames).then(updateGames);
        }else {
            if(selGames.length == 1)
                addGameToCourse(id_school, course_code, games.find(g => g.code == selGames[0]))
                .then(updateGames);
            else
                addGamesToCourse(id_school, course_code, selGames.map(g => games.find(g2 => g2.code == g)))
                .then(updateGames);
        }
        setModalVisible(false);
    }

    return (
        <Form
            className='professor-game-form'
            layout="vertical"
        >
            <Form.Item className='professor-game-form__games'>
                <CheckGroup
                    options={games.map(g => g.code)}
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
