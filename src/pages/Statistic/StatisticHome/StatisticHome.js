//Liberias
import {useState, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';
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
    const query = qs.parse(useLocation().search);
    // const query = qs.parse(window.location.search);

    const [reloadData, setReloadData] = useState(true);
    const [siderCollapsed, setSiderCollapsed] = useState(false);
    const [data, setData] = useState([[], []]);

    const xd = getParamSearch();
    // Búsqueda por parámetros (names) e.g. {elem: "est"})
    const [paramSearch, setParamSearch] = useState(xd[0]);
    
    // Búsqueda por parámetros (values) e.g. {elem: "Estudiantes"})
    // const paramSearchValues = getParamSearchValues(paramOptions, paramSearch);
    const paramSearchValues = xd[1];

    const updateParam = (name, config) => {
        
        const param = paramOptions.find(param => param.name === name);
        switch(param.type) {
            case 'radio':
                const op = param.options.find(op => op.value === config);
                setParamSearch({
                    ...paramSearch, 
                    [param.name]: op.name,
                });
                break;
            case 'check':
                const ops = param.options.filter(op => config.includes(op.value));
                setParamSearch({
                    ...paramSearch, 
                    [param.name]: ops.map(op => op.name),
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

    function getParamSearch() {
        const paramSearch = {},
            paramSearchValues = {};
        
        paramOptions.forEach(param => {
            switch(param.type) {
                case 'check':
                    paramSearchValues[param.name] = [];

                    if(query[param.name]) { //Confirmamos que exista una búsqueda en este parámetro
                        //"search" => ["search"]
                        if(typeof query[param.name] === 'string') query[param.name] = [query[param.name]];

                        // Asignamos aquellos que se encuentren en la lista de válidos
                        paramSearch[param.name] = query[param.name].
                            filter(q => param.options.some(o => {
                                if(o.name == q) paramSearchValues[param.name].push(o.value);
                                return o.name == q;
                            }));
                        
                        if(!paramSearch[param.name].length) {
                            paramSearch[param.name] = [param.options[0].name];
                            paramSearchValues[param.name] = [param.options[0].value];
                        }
                    }else {//Primera opción por defecto
                        paramSearch[param.name] = [param.options[0].name];
                        paramSearchValues[param.name] = [param.options[0].value];
                    }
                    break;
                    
                case 'radio':
                    //Confirmamos que exista una búsqueda en este parámetro y que sea sólo una
                    if(query[param.name] && typeof query[param.name] === 'string') {
                        // Asignamos aquellos que se encuentren en la lista de válidos
                        const option = param.options.find(o => o.name == query[param.name]);
                        if(option) {
                            paramSearch[param.name] = option.name;
                            paramSearchValues[param.name] = option.value;
                        }else {
                            paramSearch[param.name] = param.options[0].name;
                            paramSearchValues[param.name] = param.options[0].value;
                        }
                    }else {//Primera opción por defecto
                        paramSearch[param.name] = param.options[0].name;
                        paramSearchValues[param.name] = param.options[0].value;
                    }
                    break;

                case 'period':
                    param.options.forEach(op => {
                        try {
                            new Date(query[op.name]);
                            paramSearchValues[op.name] = paramSearch[op.name] = query[op.name];
                        }
                        catch {
                            paramSearchValues[op.name] = paramSearch[op.name] = op.value;
                        }
                    });
            }
        })

        return [paramSearch, paramSearchValues];
    }

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        const fullQuery = qs.stringify({
            ...query,
            ...paramSearch,
        })
        if(qs.stringify(query) !== fullQuery) window.location.search = fullQuery;
    }, []);

    useEffect(() => {
        // if(reloadData) {
        //     if(!query.cur || !query.game) setData([[], []]);
        //     else setData(statisticFilterElems(sessionGame, query, courseApi, studentApi));
        //     setReloadData(false);
        // }
    }, [reloadData]);

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
                <MenuSider
                    paramOptions={paramOptions} 
                    defParams={paramSearchValues}
                    updateParam={updateParam} 
                />
                <div className="submit">
                    {!siderCollapsed?
                        <Link to={applyChanges}>
                            <Button 
                                type="primary" 
                                onClick={() => setReloadData(true)}
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
                    <Tabs type="card">
                        <Tabs.TabPane tab="Registros" key="0">
                            <TableStatistics data={data} query={query}/>
                        </Tabs.TabPane>

                        <Tabs.TabPane tab="Gráficas" key="1">
                            <Stats data={data} query={query}/>
                        </Tabs.TabPane>
                    </Tabs> 
                </Content>
            </Layout>
        </Layout>
        </StatisticHomeContext.Provider>
    );
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

function getParamSearchValues(paramOptions, paramSearch) {
    const def = {};

    paramOptions.forEach(param => {
        switch(param.type) {
            case 'check':
                def[param.name] = param.options.filter(op => paramSearch[param.name].includes(op.name))
                    .map(op => op.value);
                break;
            case 'radio':
                def[param.name] = param.options.find(op => paramSearch[param.name] === op.name).value;
                break;
            case 'period':
                param.options.forEach(op => {
                    def[op.name] = paramSearch[op.name];
                });
                break;
        }
    });
    return def;
}
