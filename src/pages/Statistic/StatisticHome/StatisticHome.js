//Liberias
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {Layout, Tabs, Button} from 'antd';
import qs from 'query-string';

// Funciones
import { statisticFilterElems } from '../../../libraries/General/utils';

// Íconos
import { UserOutlined, EyeOutlined, RocketOutlined, CalendarOutlined, 
    BookOutlined } from '@ant-design/icons';

//Componentes
import MenuSider from '../../../components/Statistic/Sider/MenuSider';
import TableStatistics from '../../../components/Statistic/TableStatistics';
import Stats from '../../../components/Statistic/Stats';

// Contexto
import StatisticHomeContext from '../../../components/Statistic/StatisticHomeContext';

// Hooks
import useAuth from '../../../hooks/useAuth';

//Estilos
import './StatisticHome.scss';
import { getSchool } from '../../../api/school';
import { getProfessorFromSchool } from '../../../api/professor';
import { getCoursesFromSchool } from '../../../api/course';
import { getSessionsFromGame } from '../../../api/sessionGame';
import { getStudentsFromCourse } from '../../../api/student';

export default function StatisticHome() {
    const { Sider, Content } = Layout;
    const { username, role, id_school } = useAuth();
    
    const [paramOptions, setParamOptions] = useState([]); //Lista de parámetros válidos

    const [query, setQuery] = useState(qs.parse(window.location.search)); // Query actual a validar
    const [isValidQuery, setIsValidQuery] = useState(false);

    const [paramSearch, setParamSearch] = useState({}); // Nueva búsqueda por parámetros

    const [data, setData] = useState([]);

    const [gameSessions, setGameSessions] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    const [siderCollapsed, setSiderCollapsed] = useState(false);

    const updateParam = (name, config) => {
        const param = paramOptions.find(param => param.name === name);
        switch(param.type) {
            case 'check':
                const ops = param.options.filter(op => config.includes(op.value));
                setParamSearch({
                    ...paramSearch, 
                    [param.name]: ops.map(op => op.name),
                });
                break;
            case 'radio':
                const op = param.options.find(op => op.value === config);
                setParamSearch({
                    ...paramSearch, 
                    [param.name]: op.name,
                });
                break;
            case 'period':
                setParamSearch({
                    ...paramSearch,
                    ...config,
                })
                break;
        }
    }

    const checkData = () => {
        // setIsValidData(false);

        if(query.cur && isValidQuery) {
            const [courses_, students_] = statisticFilterElems(gameSessions, query, courses, students);
            // console.log(courses_, students_);
            setData(query.elem === 'cur' ? courses_ : students_);
        }
    }

    const queryUrl = () => {
        return {
            pathname: '/statistics',
            search: qs.stringify({
                ...query,
                ...paramSearch,
            })
        }
    }

    const applyChanges = () => {
        // setIsValidQuery(false);
        setQuery(getValidQuery(paramOptions, {...query, ...paramSearch}));
    };

    useEffect(async () => {
        const paramOptions = await getParameters(username, role, id_school);
        setParamOptions(paramOptions);
        
        const validQuery = getValidQuery(paramOptions, query);
        const queryString = `?${qs.stringify(validQuery)}`;
        
        if(window.location.search !== queryString) window.location.search = queryString;
        // if(window.location.search !== queryString) {
        //     const newurl = window.location.href + queryString;
        //     // Para evitar reload https://stackoverflow.com/questions/10970078/modifying-a-query-string-without-reloading-the-page
        //     window.history.pushState({path:newurl},'',newurl);
        // }

        const courses = await getCoursesFromSchool(id_school);
        const students = [];
        courses.forEach(async c => (
            students.push(...(await getStudentsFromCourse(id_school, c.code)))
        ))
        setCourses(courses);
        setStudents(students);
        setGameSessions(await getSessionsFromGame(id_school, query.game));

        setQuery(validQuery);
        setIsValidQuery(true);
    }, []);

    useEffect(async () => {
        setGameSessions(await getSessionsFromGame(id_school, query.game));
        // setIsValidQuery(true);
    }, [query]);

    useEffect(() => checkData(), [gameSessions]);

    return (
        <StatisticHomeContext.Provider value={{query}}>
        <Layout className="statistic-home">
            <Sider
                className="statistic-home__sider"
                collapsible
                collapsed={siderCollapsed}
                onCollapse={() => setSiderCollapsed(!siderCollapsed)}
                width={240}
            >
                {isValidQuery?
                <MenuSider
                    paramOptions={paramOptions} 
                    query={query}
                    updateParam={updateParam} 
                />:null}

                <div className="submit">
                    {!siderCollapsed?
                        <Link to={queryUrl}>
                            <Button 
                                type="primary" 
                                onClick={applyChanges}
                            >
                                Aplicar cambios
                            </Button>
                        </Link>
                        :null
                    }
                </div>
            </Sider>
            <Layout>
                <Content
                    className="statistic-home__content"
                    style={{ "marginLeft": siderCollapsed? "80px" : "240px" }}
                >
                    <Tabs type="card">
                        <Tabs.TabPane tab="Registros" key="0">
                            <TableStatistics data={data}/>
                        </Tabs.TabPane>

                        <Tabs.TabPane tab="Gráficas" key="1">
                            <Stats data={data}/>
                        </Tabs.TabPane>
                    </Tabs>
                </Content>
            </Layout>
        </Layout>
        </StatisticHomeContext.Provider>
    );
}

function getValidQuery(paramOptions, query) {
    // console.log(query);
    const newQuery = {};
    
    paramOptions.forEach(param => {
        switch(param.type) {
            case 'check':
                if(query[param.name]) { //Confirmamos que exista una búsqueda en este parámetro
                    //"search" => ["search"]
                    if(typeof query[param.name] === 'string') query[param.name] = [query[param.name]];

                    // Asignamos aquellos que se encuentren en la lista de válidos
                    newQuery[param.name] = query[param.name].
                        filter(q => param.options.some(o => o.name === q));
                    
                    // if(!newQuery[param.name].length) newQuery[param.name] = [param.options[0].name];

                }else newQuery[param.name] = [];
                break;
                
            case 'radio':
                //Confirmamos que exista una búsqueda en este parámetro y que sea sólo una
                if(query[param.name] && typeof query[param.name] === 'string') {
                    // Asignamos aquellos que se encuentren en la lista de válidos
                    const option = param.options.find(o => o.name == query[param.name]);
                    
                    if(option) newQuery[param.name] = option.name;
                    else newQuery[param.name] = param.options[0].name;

                }else newQuery[param.name] = param.options[0].name;//Primera opción por defecto
                break;

            case 'period':
                param.options.forEach(op => {
                    if(isNaN(Date.parse(query[op.name]))) newQuery[op.name] = op.value;
                    else newQuery[op.name] = query[op.name];
                });
                break;
        }
    })
    console.log(newQuery);
    return newQuery;
}

async function getParameters(username, role, id_school){
    const school = await getSchool(id_school);

    const courses = role == 'rector' ? 
        school.courses : role == 'professor' ? 
        (await getProfessorFromSchool(id_school, username)).courses : [];
    //
    if(!courses) courses = [];
    const games = school.games || [];

    return [
        {
            name: 'cur',
            type: 'check',
            title: 'Cursos',
            options: courses.map(({ code, name }) => (
                { name: code, value: name }
            )),
            icon: BookOutlined,
        },
        {
            name: 'elem',
            type: 'radio',
            title: 'Elemento',
            options: [{name: 'est', value: 'Estudiantes'}, {name: 'cur', value: 'Cursos'}],
            icon: UserOutlined,
        },
        {
            name: 'game',
            type: 'radio',
            title: 'Juego',
            options: games.map(({ code, name }) => (
                { name: code, value: name }
            )),
            icon: RocketOutlined,
        },
        // {
        //     name: 'dis',
        //     type: 'check',
        //     title: 'Discapacidad visual',
        //     options: [{name: 'op1', value: 'Op1'}, {name: 'op2', value: 'Op2'}],
        //     icon: EyeOutlined,
        // },
        {
            name: 'period',
            type: 'period',
            title: 'Período',
            options: [
                {name: 'from', value: new Date(Date.now() - 30 * 24 * 3600 * 1000).toLocaleDateString().replaceAll('/', '-')},
                {name: 'to', value: new Date(Date.now()).toLocaleDateString().replaceAll('/', '-')}
            ],
            // options: [
            //     {name: 'from', value: new Date('2021/10/01').toLocaleDateString().replaceAll('/', '-')},
            //     {name: 'to', value: new Date('2021/12/01').toLocaleDateString().replaceAll('/', '-')}
            // ],
            icon: CalendarOutlined,
        },
    ];
}
