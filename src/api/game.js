import { basePath } from './config';
import { ACCESS_TOKEN } from '../utils/constants';

export function getGamesFromSchool(id_school) {
    const url = `${basePath}/school/${id_school}/game`;
    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    };

    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message);
}

export function getGameFromSchool(id_school, game_code) {
    const url = `${basePath}/school/${id_school}/game/${game_code}`;
    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    };

    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message);
}

export function addGame(id_school, data) {
    const url = `${basePath}/school/${id_school}/game`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message);
}

export function editGame(id_school, game_code, data) {
    const url = `${basePath}/school/${id_school}/game/${game_code}`;
    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message);
}

export function delGame(id_school, game_code) {
    const url = `${basePath}/school/${id_school}/game/${game_code}`;
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        },
    };

    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message);
}
