import courseApi from './course.json';
import studentApi from './student.json';

export default function defElems(sessions, query) {
    // Límites de fecha
    const from = new Date(query.from.split('-').reverse()).getTime(), 
        to = new Date(query.to.split('-').reverse()).getTime();
    
    // Filtrado de sesiones por fecha
    sessions = sessions.filter(s => {
        const date = new Date(s.endTime).getTime();
        return date >= from && date <= to //&& s.games.some(g => query.app.includes(g.name));
    });

    // Filtrado de los juegos de las sesiones
    sessions.forEach(s => {
        s.games = s.games.filter(g => query.game.includes(g.code));
    });

    const courses = courseApi
        .map(course => {
            const {name, code, level} = course;
            return {name, code, level, sessions: []};
        })
        .filter(c => query.cur.includes(c.code));
    
    
    let students = [];
    sessions.forEach(session => {
        let student = students.find(s => s.numDoc === session.student.numDoc);
        if(!student) {
            student = {...session.student};

            if(!courses.some(c => c.code === student.course)) return;

            student.sessions = [];
            students.push(student);
        }

        const studentFull = studentApi.find(s => s.numDoc === student.numDoc);
        student.gender = studentFull.gender;
        student.age = studentFull.age;

        const date = session.endTime;
        const totTime = (new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 3600 / 1000;
        let accuracy = 0;
        let cont = 0;
        
        session.games.forEach(game => {
            game.levels.forEach(level => {
                cont++;
                accuracy += level.accuracy;
            });
        });
        accuracy = cont ? accuracy / cont : 0;

        student.sessions.push({date, totTime, accuracy});
        const course = courses.find(c => c.code === student.course);
        if(course) course.sessions.push({date, totTime, accuracy});
    });

    return [courses.filter(c => c.sessions.length), students];
}
