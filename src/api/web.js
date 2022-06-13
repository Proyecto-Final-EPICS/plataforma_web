import { basePath } from './config';

export function helloApi() {
    return fetch(`${basePath}/ping`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => json)
    .catch(err => err.message)
}
