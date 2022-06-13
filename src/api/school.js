import { basePath } from './config';
import { getAccessTokenApi } from './auth';

export function getSchools() {
    const url = `${basePath}/school`;
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message)
}

export function getSchool(id_school) {
    const url = `${basePath}/school/${id_school}`;
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message)
}

export function addSchool(data) {
    const url = `${basePath}/school`;
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

export function editSchool(id_school, data) {
    const url = `${basePath}/school/${id_school}`;
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
        .catch(err => err.message)
}

export function delSchool(id_school) {
    const url = `${basePath}/school/${id_school}`;
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(res => res.json())
        .then(json => json)
        .catch(err => err.message)
}
