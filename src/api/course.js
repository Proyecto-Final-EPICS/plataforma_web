import { basePath } from './config';
import { ACCESS_TOKEN } from '../utils/constants';

export function getCoursesFromSchool(id_school) {
    const url = `${basePath}/school/${id_school}/course`;
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

export function getCourseFromSchool(id_school, course_code) {
    const url = `${basePath}/school/${id_school}/course/${course_code}`;
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

export function addCourse(id_school, data) {
    const url = `${basePath}/school/${id_school}/course`;
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

export function editCourse(id_school, course_code, data) {
    const url = `${basePath}/school/${id_school}/course/${course_code}`;
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

export function delCourse(id_school, course_code) {
    const url = `${basePath}/school/${id_school}/course/${course_code}`;
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
