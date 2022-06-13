import { basePath } from './config';

// export function helloApi() {
//     console.log(basePath);
//     return fetch(basePath, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(res => res.json())
//     .then(json => json)
//     .catch(err => err.message)
// }

export function helloApi() {
    const url = `${basePath}`;
    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(url, params)
        .then(res => {console.log(res); return res.json()})
        .then(json => json)
        .catch(err => err.message);
}
