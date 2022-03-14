//Liberias
import {useState, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';
import {Layout, Tabs, Button} from 'antd';
import qs from 'query-string';

// Funciones
import statisticFilterElems from './../../../libraries/statisticFilterElems';
import { getSessionGameApi } from '../../../api/sessions';

// Mock Data
import courseApi from '../../../mock_data/course.json';
import studentApi from '../../../mock_data/student.json';
import sessionGame from '../../../mock_data/sessionGame.json'

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
// import ColumnGroup from 'antd/lib/table/ColumnGroup';

//...
const {Sider, Content} = Layout;

export default function StatisticHome(){
    
    const [reloadData, setReloadData] = useState(true);
    const [siderCollapsed, setSiderCollapsed] = useState(false);
    const [data, setData] = useState([[], []]);
    const query = qs.parse(useLocation().search);

    const parameters = [
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
            options: [
                {name: 'from', value: new Date(Date.now() - 60 * 24 * 3600 * 1000).toLocaleDateString().replaceAll('/', '-')},
                {name: 'to', value: new Date(Date.now()).toLocaleDateString().replaceAll('/', '-')}
            ],
            icon: CalendarOutlined,
        },
    ];

    const [paramSearch, setParamSearch] = useState(defParamSearch);

    const getDefParams = () => {
        const def = {};

        parameters.forEach(param => {
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

    const updateParam = (name, config) => {
        
        const param = parameters.find(param => param.name === name);
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

    function defParamSearch() {
        const def = {};
        
        parameters.forEach(param => {
            switch(param.type) {
                case 'check':
                    def[param.name] = 
                        (query[param.name] &&
                            (typeof query[param.name] === 'object' 
                                && query[param.name].filter(q => param.options.some(o => o.name === q))
                            )
                            || (typeof query[param.name] === 'string' && 
                                [param.options.find(o => o.name === query[param.name]).name])
                            )
                        || [param.options[0].name];
                    break;
                case 'radio':
                    def[param.name] = 
                        (query[param.name] && typeof query[param.name] === 'string' 
                            && param.options.find(o => o.name === query[param.name]).name)
                        || param.options[0].name;
                    break;
                case 'period':
                    param.options.forEach(op => {
                        def[op.name] = query[op.name] || op.value;
                        // console.log(def[op.name]);
                    });
                    break;
            }
        });
        return def;
    }

    const onSiderCollapse = () => {
        setSiderCollapsed(!siderCollapsed);
    }

    useEffect(() => {
        const fullQuery = qs.stringify({
            ...query,
            ...paramSearch,
        })
        if(qs.stringify(query) !== fullQuery) window.location.search = fullQuery;
    }, [])

    useEffect(() => {
        if(reloadData) {
            if(!query.cur || !query.game) setData([[], []]);
            // else getSessionGameApi().then(response => (
            //     setData(statisticFilterElems(response, query, courseApi, studentApi))
            // ))
            else setData(statisticFilterElems(sessionGame, query, courseApi, studentApi));
            setReloadData(false);
        }
    }, [reloadData]);

    return (
        <StatisticHomeContext.Provider value={{
            
        }}>
        <Layout className="layout-home">
            <Sider
                className="layout-home__sider"
                collapsible
                collapsed={siderCollapsed}
                onCollapse={onSiderCollapse}
                width={240}
            >
                <MenuSider
                    parameters={parameters} 
                    defParams={getDefParams()}
                    updateParam={updateParam} 
                />
                <div className="submit">
                    {!siderCollapsed?
                        <Link to={applyChanges}>
                            <Button 
                                type="primary" 
                                // onClick={() => {
                                //     getSessionGameApi().then(response => {
                                //         console.log(response);
                                //     })
                                // }}
                                onClick={() => setReloadData(true)}
                                // onClick={() => formatSessions()}
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
