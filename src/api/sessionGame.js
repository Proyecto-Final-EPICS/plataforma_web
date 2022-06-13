import { basePath } from './config';

export function getSessionsFromGame(id_school, game_code) {
    const url = `${basePath}/school/${id_school}/game/${game_code}/session`;
    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message);
}
