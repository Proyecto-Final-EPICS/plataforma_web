export default function statisticFilterElems(sessions, query, courseApi, studentApi) {
    // Límites de fecha
    const from = new Date(query.from.split('-').reverse()).getTime(), 
        to = new Date(query.to.split('-').reverse()).getTime();
    
    // Filtrado de sesiones por fecha
    sessions = sessions.filter(s => {
        const date = new Date(s.endTime).getTime();
        return date >= from && date <= to //&& s.games.some(g => query.app.includes(g.name));
    });

    // Filtrado de los juegos de las sesiones
    sessions.forEach(s => s.games = s.games.filter(g => query.game.includes(g.code)));

    // Filtrado de cursos
    const courses = courseApi
        .filter(c => query.cur.includes(c.code))
        .map(c => {
            const {name, code, level} = c;
            return {name, code, level, sessions: []};
        });

    let students = [];
    sessions.forEach(session => {
        // Buscamos si este estudiante ya fue añadido
        let student = students.find(s => s.identityDoc === session.student.identityDoc);
        if(!student) { //Si no, lo añadimos
            student = {...session.student};

            // Si el estudiante no pertenece a ningún curso, se descarta
            if(!courses.some(c => c.code === student.course.code)) return;

            student.sessions = [];
            students.push(student);
        }

        // Se añade más data
        const studentFull = studentApi.find(s => s.identityDoc === student.identityDoc);
        student.gender = studentFull.gender;
        student.birthDate = studentFull.birthDate;
        
        const date = session.endTime;
        const totTime = (new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) 
            / 1000 / 3600;
        let accuracy = 0;
        let cont = 0;
        
        session.games.forEach(game => {
            game.levels.forEach(level => {
                cont++;
                accuracy += level.accuracy;
            });
        });
        // accuracy = cont ? accuracy / cont : 0;
        accuracy = cont && accuracy / cont;

        // Se almacenan los datos de la sesión en cada array
        student.sessions.push({date, totTime, accuracy});
        const course = courses.find(c => c.code === student.course.code);
        if(course) course.sessions.push({date, totTime, accuracy});
    });

    // Se tienen en cuenta sólo cursos con sesiones
    return [courses.filter(c => c.sessions.length), students];
}
