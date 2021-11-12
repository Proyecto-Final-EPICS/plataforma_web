export default function defElems(query) {
    if(!query.cur || !query.app) return [[], []];

    const courses = defCourses().filter(c => query.cur.includes(c.code));
    let students = defStudents().filter(student => query.cur.includes(student.course));

    const from = new Date(query.from.split('-').reverse()).getTime(), 
        to = new Date(query.to.split('-').reverse()).getTime();

    students.forEach(student => {
        student.sessions = student.sessions.filter(s => {
            const time = new Date(s.date).getTime();
            return query.app.includes(s.app) 
                && time >= from && time <= to;
        });
    })
    students = students.filter(s => s.sessions.length);
    
    students.forEach(student => {
        // Curso al que pertenece el estudiante
        const course = courses.find(c => c.code === student.course);
        if(!course.performance) course.performance = [];
        
        student.sessions.forEach(s => {
            // App usada en la sesión
            let app = course.performance.find(app => app.code === s.app);
            if(!app) {
                app = {
                    code: s.app,
                    totTime: 0,
                    accuracy: 0,
                    highestLevel: NaN,
                    numSessions: 0,
                };
                course.performance.push(app);
            }
            app.totTime += s.totTime;
            app.accuracy += s.accuracy;
            if(isNaN(app.highestLevel) || s.highestLevel > app.highestLevel) app.highestLevel = s.highestLevel;
            app.numSessions += 1;
        });
    });

    courses.forEach(course => {
        course.performance && course.performance.forEach(app => {
            app.avTime = app.totTime / app.numSessions;
            app.accuracy /= app.numSessions;
        });
    });
    
    return [
        courses.filter(course => course.performance && course.performance.some(app => query.app.includes(app.code))),
        students
    ];
}

function defStudents() {
    return [
        {
            firstname: 'Miralem',
            lastname: 'Pjanic',
            identityDoc: '001',
            age: 19,
            gender: "Masculino",
            // email: 'mpjanic@vip-epics.com',
            course: 'C01',
            sessions: [
                {
                    app: 'app2',
                    date: '2021-11-11',
                    totTime: 36000, //milis
                    accuracy: 0.87,
                    highestLevel: 4,
                },
                {
                    app: 'app1',
                    date: '2021-11-8',
                    totTime: 36000, //milis
                    accuracy: 0.87,
                    highestLevel: 4,
                },
                {
                    app: 'app1',
                    date: '2021-11-9',
                    totTime: 36000, //milis
                    accuracy: 0.87,
                    highestLevel: 4,
                },
            ]
        },
        {
            firstname: 'Johana',
            lastname: 'White',
            identityDoc: '003',
            age: 22,
            gender: "Femenino",
            // email: 'jwhite@vip-epics.com',
            course: 'C02',
            sessions: [
                {
                    app: 'app1',
                    date: '2021-10-29',
                    totTime: 36000, //milis
                    accuracy: 0.99,
                    highestLevel: 4,
                },
                {
                    app: 'app2',
                    date: '2021-10-30',
                    totTime: 36000, //milis
                    accuracy: 0.9,
                    highestLevel: 4,
                },
                {
                    app: 'app2',
                    date: '2021-11-2',
                    totTime: 36000, //milis
                    accuracy: 0.87,
                    highestLevel: 4,
                },
            ]
        },
        {
            firstname: 'Diana',
            lastname: 'Ramírez',
            identityDoc: '004',
            age: 17,
            gender: "Femenino",
            // email: 'jwhite@vip-epics.com',
            course: 'C03',
            sessions: [
                {
                    app: 'app1',
                    date: '2021-10-18',
                    totTime: 0, //milis
                    accuracy: 0,
                    highestLevel: 0,
                },
            ]
        },
        {
            firstname: 'Francisco',
            lastname: 'Trincao',
            identityDoc: '002',
            age: 22,
            gender: "Masculino",
            // email: 'ftrincao@vip-epics.com',
            course: 'C02',
            sessions: [
                {
                    app: 'app2',
                    date: '2021-10-26',
                    totTime: 72000, //milis
                    accuracy: 0.87,
                    highestLevel: 4,
                },
            ]
        },
    ];
}

function defCourses() {
    return [
        {
            name: 'Curso 01',
            code: "C01",
            level: 'B1',
        },
        {
            name: 'Curso 02',
            code: "C02",
            level: 'C2',
        },
        {
            name: 'Curso 03',
            code: "C03",
            level: 'A2',
        },
    ];
}
