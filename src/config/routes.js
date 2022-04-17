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
// import Colegios from '../pages/Professor/Colegios';
// import Colegio from '../pages/Professor/Colegio';
// import Colegio_Games from '../pages/Professor/Colegio_Games';
// import Estudiante from '../pages/Professor/Estudiante';//Es la info del estudiante en el juego
// import Students_Games from '../pages/Professor/Students_Games';
// import GamesStudent from '../pages/Professor/GamesStudent';
// import Menu_Cards from '../pages/Professor/Menu_Cards';
// import Graficos from '../pages/Professor/Graficos';

//Pages Statistic
import StatisticHome from '../pages/Statistic/StatisticHome'

const routes = {//Es el sistema de rutas, el array contiene todas las rutas
    noUser: [
        {
            path: ["/", "/login"],
            component: Login,
            exact: true
        },
        // {
        //     path: "/sign-up",
        //     component: SignUp,
        //     exact: true
        // },
        {
            component: Error404
        }
    ],
    admin: [
        {
            path: ["/", "/home"],
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
            path: ["/", "/home"],
            component: LayoutDirector,
            exact: false,
            routes:[
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
            path: ["/", "home"],
            component: LayoutProfessor,
            exact: false,
            routes:[
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
                // {
                //     path: "/home/colegios",
                //     component: Colegios,
                //     exact: true
                // },
                // {
                //     path: "/home/colegios/:colegio",
                //     component: Students_Games,
                //     exact: true
                // },
                // {
                //     path: "/home/colegios/:colegio/estudiantes",
                //     component: Colegio,
                //     exact: true
                // },
                // {
                //     path: "/home/colegios/:colegio/juegos",
                //     component: Colegio_Games,
                //     exact: true
                // },
                // {
                //     path: "/home/colegios/:colegio/juegos/:juego",
                //     component: Colegio_Games,
                //     exact: true
                // },
                // {
                //     path:"/home/colegios/:colegio/estudiantes/:estudiante-:username",
                //     component: GamesStudent,
                //     exact: true
                // },
                // {
                //     path:"/home/colegios/:colegio/estudiantes/:estudiante-:username/:game",
                //     component: Menu_Cards,
                //     exact: true
                // },
                // // {
                // //     path:"/home/colegios/:colegio/estudiantes/:estudiante-:username/:game/sesiones",
                // //     component: Estudiante,
                // //     exact: true
                // // },
                // {
                //     path:"/home/colegios/:colegio/estudiantes/:estudiante-:username/:game/nivel-:nivel",//Revisara acá
                //     component: Estudiante,
                //     exact: true
                // },
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
