import { basePath } from './config';
import { getAccessTokenApi } from './auth';
import qs from 'query-string'

export function getGamesFromSchool(id_school) {
    const url = `${basePath}/school/${id_school}/game`;
    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessTokenApi()}`
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
            Authorization: `Bearer ${getAccessTokenApi()}`
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
            Authorization: `Bearer ${getAccessTokenApi()}`
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
            Authorization: `Bearer ${getAccessTokenApi()}`
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
            Authorization: `Bearer ${getAccessTokenApi()}`
        },
    };

    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message);
}

export function addGameToCourse(id_school, course_code, data) {
    const url = `${basePath}/school/${id_school}/course/${course_code}/game`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessTokenApi()}`
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message);
}

export function delGameFromCourse(id_school, course_code, game_code) {
    const url = `${basePath}/school/${id_school}/course/${course_code}/game/${game_code}`;
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessTokenApi()}`
        },
    };

    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message);
}

export function addGamesToCourse(id_school, course_code, data) {
    const url = `${basePath}/school/${id_school}/course/${course_code}/games`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessTokenApi()}`
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message);
}

export function delGamesFromCourse(id_school, course_code, games_code) {
    const url = `${basePath}/school/${id_school}/course/${course_code}/games?${qs.stringify({'code': games_code})}`;
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessTokenApi()}`
        },
    };

    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message);
}
