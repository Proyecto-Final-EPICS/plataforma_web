//Liberias
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Layout, Button, Menu} from 'antd';

//Componentes
import ListStudents from '../../../components/Statistic/Students/ListStudents';
import Modal from '../../../components/Modal';

//Íconos
import {
    UserOutlined, 
    TeamOutlined, 
    RocketTwoTone, 
    EyeOutlined, 
    CalendarOutlined, 
} from '@ant-design/icons';

//Recursos
import defSiderStructure from '../../../assets/json/Statistic/StatisticHome/defSiderStructure.json';
import defSiderParams from '../../../assets/json/Statistic/StatisticHome/defSiderParams.json';

//API
// import {getEstudiantesByColegio} from '../../../api/colegio';

//Estilos
import './StatisticHome.scss';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

//...
const {Sider, Content, Header} = Layout;
const {SubMenu} = Menu;
console.log(UserOutlined)
StatisticHome.defaultProps = {
    siderParams: defSiderParams,
}

export default function StatisticHome(props){
    
    const [elements, setElements] = useState([]); //Estudiantes o cursos
    const [reloadElements, setReloadElements] = useState(false);
    const [siderCollapsed, setSiderCollapsed] = useState(true);
    const [siderStructure, setSiderStructure] = useState({}); //Parámetros del sider
    const [vista, setVista] = useState('tabla');

    //Constantes para el modal
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    
    const receiveParams = () => {
        const temp = defSiderStructure;

        temp.param1.options.op1.icon = UserOutlined;
        temp.param1.options.op2.icon = TeamOutlined;
        temp.param2.icon = RocketTwoTone;

        for (let p in defSiderParams) {
            temp[p].all = defSiderParams[p].all;
            
            if(temp[p].all) {
                for (let op in temp[p].options) {
                    temp[p].options[op].sel = true;
                }
            } else {
                for(let op of defSiderParams[p].options) {
                    temp[p].options[op].sel = true;
                }
            }
        }
        setSiderStructure(temp);
    }

    useEffect(() => {
        receiveParams();
    }, []);

    return(
        <Layout>
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
            
            <Sider
                className="contenido__sider"
                collapsible
                collapsed={siderCollapsed}
                onCollapse={() => {setSiderCollapsed(!siderCollapsed)}}
                >
                <div className="contenido__sider__logo">{siderCollapsed?'P':'Parámetros'}</div>

                <Menu>
                    {Object.keys(siderStructure).map((el, index) => (
                        <DisplaySubMenu param={siderStructure[el]} key={index}/>
                    ))}
                </Menu>
            </Sider>
            
            <Layout className="contenido">
                <Header className="contenido__header">

                    <div className="contenido__header__col">
                        <h1>Nombre</h1>
                    </div>

                    <div className="contenido__header__col">
                        <h1>Edad</h1>
                    </div>     

                    <div className="contenido__header__col">
                        <h1>Usuario</h1>
                    </div>  

                    <div className="contenido__header__col">
                        <h1>Acción</h1>
                    </div>
                </Header>

                <Content className="contenido__content"> 
                    <ListStudents students={[]}/>
                </Content>
            </Layout>
            
        </Layout>
    );
}

function DisplaySubMenu(props) {
    
    const {title, icon, options, all} = props.param;
    // console.log(icon)
    // console.log(all)
    const DisplayIcon = () => {
        console.log('Dios mátame')
        if (all) return icon;

        let numSelOptions = 0;
        let lastIconOptionSel = null;
        
        for (let op in options) {
            if (options[op].sel){
                lastIconOptionSel = options[op].icon;
                numSelOptions += 1;
            }
        }
        console.log(lastIconOptionSel)
        if(numSelOptions == 0 || numSelOptions > 1) return icon;
        if(numSelOptions == 1) return lastIconOptionSel;
    }
    const Icon = DisplayIcon();

    // return(
    // <SubMenu key="sub1" icon={<UserOutlined />} title="User">
    //     <Menu.Item key="3">Tom</Menu.Item>
    //     <Menu.Item key="4">Bill</Menu.Item>
    //     <Menu.Item key="5">Alex</Menu.Item>
    // </SubMenu>
    // )

    // return(
    //     <SubMenu key="sub1" icon={<Icon />} title={title}>
    //         <Menu.Item key="3">Tom</Menu.Item>
    //         <Menu.Item key="4">Bill</Menu.Item>
    //         <Menu.Item key="5">Alex</Menu.Item>
    //     </SubMenu>
    // )

    return(
        <SubMenu
            // key={props.key}
            title={title}
            icon={<Icon/>}
        >
            {Object.keys(options).map((op, index) => (
                <Menu.Item
                    // key={index}
                >
                    {options[op].title}
                </Menu.Item>
                // <DisplayMenuItem title={options[op].title} key={index}/>
            ))}
            
        </SubMenu>
    )
}

// StatisticHome.defaultProps = {
//     siderStructure: {
//         sobre: 'Estudiantes',
//         apps: {
//             list: [
//                 {
//                     name: 'App 1', sel: true,
//                 },
//                 {
//                     name: 'App 2', sel: true,
//                 }
//             ],
//             all: {name: 'Selec. todas', sel: true},
//         },
//         discapacidad: {
//             list: [
//                 {
//                     name: 'Dis 1', sel: true,
//                 },
//                 {
//                     name: 'Dis 2', sel: true,
//                 }
//             ],
//             all: {name: 'Selec. todas', sel: true},
//         },
//         periodo: {
//             fechaIni: new Date(2021, 0, 1),
//             fechaFin: Date.now(),
//         },
//     }
// }