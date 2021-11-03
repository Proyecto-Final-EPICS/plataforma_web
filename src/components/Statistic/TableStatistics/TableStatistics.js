import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import TableStudents from '../TableStudents';
import TableCourses from '../TableCourses';

import qs from 'query-string';

export default function TableStatistics(props) {
    const query = qs.parse(useLocation().search);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        const elems = defElems(query);
        console.log(elems);
        setCourses(elems[0]);
        setStudents(elems[1]);
        // setElems(query.elem === 'cur' ? elems[0] : elems[1]);
    }, []);
    
    return(
        <>
        {query.elem === 'cur' ?
        <TableCourses query={query} courses={courses}/> :
        <TableStudents query={query} students={students}/>
        }
        </>
    );
}

function defElems(query) {
    if(!query.cur) return [[], []];

    const courses = defCourses().filter(c => query.cur.includes(c.code));
    const students = defStudents().filter(s => query.cur.includes(s.course));
    // const students = defStudents().filter(s => courses.some(c => c.code === s.course));
    
    students.forEach(student => {
        // Curso al que pertenece el estudiante
        const course = courses.find(c => c.code === student.course);
        if(!course.performance) course.performance = [];
        
        student.sessions.forEach(s => {
            // App usada en la sesión
            let app = course.performance.find(p => p.code === s.app.code);
            if(!app) {
                const {name, code} = s.app;
                app = {
                    code, name,
                    totTime: 0,
                    accuracy: 0,
                    highestLevel: 0,
                    numSessions: 0,
                };
                course.performance.push(app);
            }
            app.totTime += s.totTime;
            app.accuracy += s.accuracy;

            if(s.highestLevel > app.highestLevel) app.highestLevel = s.highestLevel;
            // app.highestLevel = (!app.highestLevel || app.highestLevel < s.app.highestLevel) ?
            //     s.app.highestLevel : app.highestLevel;
            app.numSessions += 1;
        });
    });

    courses.forEach(course => {
        course.performance && course.performance.forEach(app => {
            app.avTime = app.totTime / app.count;
            app.accuracy /= app.count;
            // app.highestLevel /= app.count;
        });
    });
    // console.log(courses);
    return [
        courses.filter(course => course.performance && course.performance.some(app => query.app.includes(app.code))),
        students.filter(student => student.sessions.some(s => query.app.includes(s.app.code)))
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
                    app: {
                        name: 'App2',
                        code: 'app2',
                    },
                    date: '10/10/2020',
                    duration: 36000, //milis
                    accuracy: 0.87,
                    highestLevel: 4,
                },
                {
                    app: {
                        name: 'App1',
                        code: 'app1',
                    },
                    date: '10/10/2020',
                    duration: 36000, //milis
                    accuracy: 0.87,
                    highestLevel: 4,
                },
                {
                    app: {
                        name: 'App2',
                        code: 'app2',
                    },
                    date: '10/10/2020',
                    duration: 36000, //milis
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
                    app: {
                        name: 'App1',
                        code: 'app1',
                    },
                    date: '10/10/2020',
                    duration: 36000, //milis
                    accuracy: 0.87,
                    highestLevel: 4,
                },
                {
                    app: {
                        name: 'App2',
                        code: 'app2',
                    },
                    date: '10/10/2020',
                    duration: 36000, //milis
                    accuracy: 0.87,
                    highestLevel: 4,
                },
                {
                    app: {
                        name: 'App2',
                        code: 'app2',
                    },
                    date: '10/10/2020',
                    duration: 36000, //milis
                    accuracy: 0.87,
                    highestLevel: 4,
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
                    app: {
                        name: 'App2',
                        code: 'app2',
                    },
                    date: '10/10/2020',
                    duration: 36000, //milis
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
            // code: 'Curso 01',
            code: "C01",
            level: 'B1',
        },
        {
            // code: 'Curso 02',
            code: "C02",
            level: 'C2',
        },
        {
            // code: 'Curso 03',
            code: "C03",
            level: 'A2',
        },
    ];
}
