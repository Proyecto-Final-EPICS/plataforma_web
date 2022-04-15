import {basePath} from './config';

//Endpoint para traer todos los colegios
export function getColegiosApi(){
    const url = `${basePath}/school`;
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    return fetch(url,params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err.message;
    })
}

//Endpoint para traer todos los profesores
export function getProfessorsApi(){
    const url = `${basePath}/professor`;
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    return fetch(url,params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err.message;
    })
}

//Endpoint para traer todos los videojuegos
export function getVideogamesApi(){
    const url = `${basePath}/detailsGame`;
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    return fetch(url,params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err.message;
    })
}

//Endpoint para agregar un estudiante
export function addStudent(info){
    const data = {
        schoolName: info.schoolName,
        students:{
            studentName: info.students.studentName,
            age: info.students.age,
            username: info.students.username,
            password: info.students.password
        }
    }
    const url = `${basePath}/student`;
    const params = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    }

    return fetch(url,params)
    .then(response => {
        return response.json()
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err.message;
    })
}