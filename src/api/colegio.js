import {basePath} from './config';

//Endpoint para traer todos los colegios
export function getColegiosApi(){
    const url = `${basePath}/getSchoolsDetails`;
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


//Endpoint para traer colegios dado un profesor
export function getColegiosByProfessorApi(name){
    const url = `${basePath}/professorSchool?username=${name}`
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


//Endpoint para traer el último puntaje de un estudiante 
export function getLastSession(game,name){
    const url = `${basePath}/LastSessionStudentGame?game=${game}&username=${name}`
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

//Endpoint para traer estudiantes dado un nombre
export function getEstudiantesByColegio(name){
    const url = `${basePath}/student?nameSchool=${name}`;
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
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

//Endpoint para obtener los juegos dado un colegio
export function getGamesByColegio(name){
    const url = `${basePath}/GameInfoBasic?school=${name}`;
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
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

//Endpoint para traer los objetivos de un juego dado el nombre del jiuego
export function getObjectivesByGameApi(name){
    const url = `${basePath}/GameObjectives?game=${name}`;
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
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


//Endpoint para traer el ranking de un juego en un colegio.
export function getRankingGameBySchool(game,nameSchool){
    const url = `${basePath}/GameStudentProcess?game=${game.name}&nameSchool=${nameSchool}`;
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
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

//Endpoint para traer juegos dado un estudiante
export function getGameByStudentApi(name){
    const url = `${basePath}/StudentGames?username=${name}`;
    const params = {
        method: 'GET',
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

export function addCourse(data){
    const url = `${basePath}/course`;
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

export function getCourseApi(){
    const url = `${basePath}/course`;
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
