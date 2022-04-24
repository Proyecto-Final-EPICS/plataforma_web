import { Redirect } from 'react-router-dom';

//Layouts
// import LayoutNoUser from '../pages/NoUser'
import LayoutDirector from '../pages/Director';
import LayoutAdmin from '../pages/Admin';
import LayoutProfessor from '../pages/Professor';
import LayoutStatistic from '../pages/Statistic';

//Pages for everybody
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import Error404 from '../pages/Error';

//Pages Admin
import AdminHome from '../pages/Admin/Home';
import AdminSchools from '../pages/Admin/Schools';
import AdminSchool from '../pages/Admin/School';
import AdminDirectors from '../pages/Admin/Directors';
import AdminProfessors from '../pages/Admin/Professors';
import AdminCourses from '../pages/Admin/Courses';
import AdminStudents from '../pages/Admin/Students';

//Pages Director
import DirectorHome from '../pages/Director/Home';
import DirectorApps from '../pages/Director/Apps';
import DirectorGames from '../pages/Director/Games';
import DirectorCourses from '../pages/Director/Courses';
import DirectorProfessors from '../pages/Director/Professors';

//Pages Professor
import ProfessorHome from '../pages/Professor/Home';
import ProfessorProfile from '../pages/Professor/Profile';
import ProfessorCalendar from '../pages/Professor/Calendar';
import ProfessorGrades from '../pages/Professor/Grades';
import ProfessorInstitution from '../pages/Professor/Institution';

//Pages Statistic
import StatisticHome from '../pages/Statistic/StatisticHome'

const routes = {//Es el sistema de rutas, el array contiene todas las rutas
    noUser: [
        {
            path: '/',
            component: () => <Redirect to="/login"/>,
            exact: true
        },
        {
            path: "/login",
            component: Login,
            exact: true
        },
        {
            component: Error404
        }
    ],
    admin: [
        {
            path: '/',
            component: () => <Redirect to="/home"/>,
            exact: true
        },
        {
            path: "/home",
            component: LayoutAdmin,
            exact: false,
            routes: [
                {
                    path: "/home",
                    component: AdminHome,
                    exact: true
                },
                {
                    path: "/schools",
                    component: AdminSchools,
                    exact: true
                },
                {
                    path: "/schools/:school",
                    component: AdminSchool,
                    exact: true
                },
                {
                    path: "/schools/:school/directors",
                    component: AdminDirectors,
                    exact: true
                },
                {
                    path: "/schools/:school/professors",
                    component: AdminProfessors,
                    exact: true
                },
                {
                    path: "/schools/:school/courses",
                    component: AdminCourses,
                    exact: true
                },
                {
                    path: "/schools/:school/students",
                    component: AdminStudents,
                    exact: true
                },
                {
                    component: Error404,
                }
            ]
        },
        {
            component: Error404,
        }
    ],
    director: [
        {
            path: '/',
            component: () => <Redirect to="/home"/>,
            exact: true
        },
        {
            path: "/home",
            component: LayoutDirector,
            exact: false,
            routes: [
                {
                    path: "/home",
                    component: DirectorHome,
                    exact: true
                },
                {
                    path: "/home/courses",
                    component: DirectorCourses,
                    exact: true
                },
                {
                    path: "/home/apps",
                    component: DirectorApps,
                    exact: true
                },
                {
                    path: "/home/apps/details",
                    component: DirectorGames,
                    exact: true
                },
                {
                    path: "/home/professors",
                    component: DirectorProfessors,
                    exact: true
                },
                {
                    component: Error404
                }
            ]
        },
        {
            path: "/statistics",
            component: LayoutStatistic,
            exact: false,
            routes: [
                {
                    path: "/statistics",
                    component: StatisticHome,
                    exact: true
                },
                {
                    component: Error404
                }
            ]
        },
        {
            component: Error404
        }
    ],
    professor: [
        {
            path: '/',
            component: () => <Redirect to="/home"/>,
            exact: true
        },
        {
            path: "/home",
            component: LayoutProfessor,
            exact: false,
            routes: [
                {
                    path: "/home",
                    component: ProfessorHome,
                    exact: true
                },
                {
                    path: "/home/profile",
                    component: ProfessorProfile,
                    exact: true
                },
                {
                    path: "/home/calendar",
                    component: ProfessorCalendar,
                    exact: true
                },
                {
                    path: "/home/grades",
                    component: ProfessorGrades,
                    exact: true
                },
                {
                    path: "/home/institution",
                    component: ProfessorInstitution,
                    exact: true
                },
                {
                    component: Error404
                }
            ]
        },
        {
            path: "/statistics",
            component: LayoutStatistic,
            exact: false,
            routes: [
                {
                    path: "/statistics",
                    component: StatisticHome,
                    exact: true
                },
                {
                    component: Error404
                }
            ]
        },
        {
            component: Error404
        }
    ],
};

export default routes;
