//Liberias
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Layout, Button, Menu} from 'antd';

//Componentes
import ListStudents from '../../../components/Statistic/Students/ListStudents';
import Modal from '../../../components/Modal';
import Parameter from '../../../components/Statistic/Sider/Parameter';

//Íconos
import {
    UserOutlined, 
    TeamOutlined, 
    RocketTwoTone, 
    EyeOutlined,
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
// const {SubMenu} = Menu;

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

        setDefaultIcons(temp);

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

    let openKeys = (() => {
        return Array.from({length: Object.keys(siderStructure).length}, (_, i) => String(i));
    })();
    console.log(openKeys);

    const selectedKeys = (() => {
        const keys = [];
        
        let numParam = 0;
        for(let param in siderStructure) {
            
            let numOp = 0;
            for(let op in siderStructure[param].options) {
                
                if(siderStructure[param].options[op].sel){
                    keys.push(String(numParam)+String(numOp));
                }
                numOp++;
            }
            numParam++;
        }
        return keys;
    })();
    console.log(selectedKeys)

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
                defaultCollapsed={true}
                onCollapse={() => {setSiderCollapsed(!siderCollapsed)}}
                // collapsed={siderCollapsed}
                // collapsedWidth={0}
                >
                <div className="contenido__sider__logo">{siderCollapsed?'P':'Parámetros'}</div>

                <Menu
                    mode="inline"
                >
                    {Object.keys(siderStructure).map((el, index) => (
                        <Parameter
                            key={String(index)}
                            {...siderStructure[el]}
                            // onChangeOption={onChangeOption}
                        />
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


function setDefaultIcons(siderStructure) {

    siderStructure.param1.icon = UserOutlined;
    siderStructure.param1.options.op1.icon = UserOutlined;
    siderStructure.param1.options.op2.icon = TeamOutlined;
    
    siderStructure.param2.icon = RocketTwoTone;
    for(let op in siderStructure.param2.options) siderStructure.param2.options[op].icon = RocketTwoTone;

    siderStructure.param3.icon = EyeOutlined;
    for(let op in siderStructure.param3.options) siderStructure.param3.options[op].icon = EyeOutlined;
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