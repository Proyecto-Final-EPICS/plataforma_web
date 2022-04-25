//Liberias
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {Layout, Tabs, Button} from 'antd';
import qs from 'query-string';

// Funciones
import statisticFilterElems from '../../../libraries/Statistic/statisticFilterElems';

// Mock Data
import courseApi from '../../../mock_data/collections/course.json';
import studentApi from '../../../mock_data/collections/student.json';
import sessionGame from '../../../mock_data/collections/sessionGame.json'

// Íconos
import {
    UserOutlined,
    EyeOutlined, 
    RocketOutlined, 
    CalendarOutlined, 
} from '@ant-design/icons';

//Componentes
import MenuSider from '../../../components/Statistic/Sider/MenuSider';
import TableStatistics from '../../../components/Statistic/TableStatistics';
import Stats from '../../../components/Statistic/Stats';

// Contexto
import StatisticHomeContext from '../../../components/Statistic/StatisticHomeContext';

//Estilos
import './StatisticHome.scss';

export default function StatisticHome(){
    const { Sider, Content } = Layout;
    const paramOptions = getParameters(); //Lista de parámetros válidos
    
    // Query actual a validar
    const [query, setQuery] = useState(qs.parse(window.location.search));
    
    // Nueva búsqueda por parámetros
    const [paramSearch, setParamSearch] = useState({});
    
    // const [reloadData, setReloadData] = useState(true);
    const [data, setData] = useState([[], []]);
    const [siderCollapsed, setSiderCollapsed] = useState(false);
    const [isValidQuery, setIsValidQuery] = useState(false);

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

    const applyChanges = () => {
        return {
            pathname: '/statistics',
            search: qs.stringify({
                ...query,
                ...paramSearch,
            })
        }
    }

    useEffect(() => {
        const validQuery = getValidQuery(paramOptions, query);
        const queryString = `?${qs.stringify(validQuery)}`;
        
        // if(window.location.search !== queryString) window.location.search = queryString;
        if(window.location.search !== queryString) {
            const newurl = window.location.href + queryString;
            // https://stackoverflow.com/questions/10970078/modifying-a-query-string-without-reloading-the-page
            window.history.pushState({path:newurl},'',newurl);
        }

        setQuery(validQuery);
        setIsValidQuery(true);
    }, []);

    // useEffect(() => {
    //     if(reloadData) {
    //         if(!query.cur || !query.game) setData([[], []]);
    //         else setData(statisticFilterElems(sessionGame, query, courseApi, studentApi));
    //         setReloadData(false);
    //     }
    // }, [reloadData]);

    return (
        <StatisticHomeContext.Provider value={{
            
        }}>
        <Layout className="layout-home">
            <Sider
                className="layout-home__sider"
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
                />:null
                }
                <div className="submit">
                    {!siderCollapsed?
                        <Link to={applyChanges}>
                        {/* <Link> */}
                            <Button 
                                type="primary" 
                                onClick={() => console.log(query)}
                            >
                                Aplicar cambios
                            </Button>
                        </Link>
                        :null
                    }
                </div>
            </Sider>
            <Layout 
                className="layout-home__layout"
                style={{
                    "marginLeft": siderCollapsed? "80px" : "240px"
                }}
            >
                <Content className="layout-home__layout__content">
                    {/* <Tabs type="card">
                        <Tabs.TabPane tab="Registros" key="0">
                            <TableStatistics data={data} query={query}/>
                        </Tabs.TabPane>

                        <Tabs.TabPane tab="Gráficas" key="1">
                            <Stats data={data} query={query}/>
                        </Tabs.TabPane>
                    </Tabs>  */}
                </Content>
            </Layout>
        </Layout>
        </StatisticHomeContext.Provider>
    );
}

function getValidQuery(paramOptions, query) {
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
                    
                    if(!newQuery[param.name].length) newQuery[param.name] = [param.options[0].name];

                }else newQuery[param.name] = [param.options[0].name]; //Primera opción por defecto
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

    return newQuery;
}

function getParameters() {
    return [
        {
            name: 'elem',
            type: 'radio',
            title: 'Elemento',
            options: [{name: 'est', value: 'Estudiantes'}, {name: 'cur', value: 'Cursos'}],
            icon: UserOutlined,
        },
        {
            name: 'game',
            type: 'check',
            title: 'Juegos',
            options: [{name: 'secube', value: 'Secube'}, {name: 'verb-to-be', value: 'Verb To Be'},
                {name: 'restaurant', value: 'Restaurant'}, {name: 'phrases', value: 'Phrases'}],
            icon: RocketOutlined,
        },
        {
            name: 'dis',
            type: 'check',
            title: 'Discapacidad visual',
            options: [{name: 'op1', value: 'Op1'}, {name: 'op2', value: 'Op2'}],
            icon: EyeOutlined,
        },
        {
            name: 'period',
            type: 'period',
            title: 'Período',
            // options: [
            //     {name: 'from', value: new Date(Date.now() - 60 * 24 * 3600 * 1000).toLocaleDateString().replaceAll('/', '-')},
            //     {name: 'to', value: new Date(Date.now()).toLocaleDateString().replaceAll('/', '-')}
            // ],
            options: [
                {name: 'from', value: new Date('2021/10/01').toLocaleDateString().replaceAll('/', '-')},
                {name: 'to', value: new Date('2021/12/01').toLocaleDateString().replaceAll('/', '-')}
            ],
            icon: CalendarOutlined,
        },
    ];
}



// function getParamSearchValues(paramOptions, newQuery) {
//     const def = {};

//     paramOptions.forEach(param => {
//         switch(param.type) {
//             case 'check':
//                 def[param.name] = param.options.filter(op => newQuery[param.name].includes(op.name))
//                     .map(op => op.value);
//                 break;
//             case 'radio':
//                 def[param.name] = param.options.find(op => newQuery[param.name] === op.name).value;
//                 break;
//             case 'period':
//                 param.options.forEach(op => {
//                     def[op.name] = newQuery[op.name];
//                 });
//                 break;
//         }
//     });
//     return def;
// }
