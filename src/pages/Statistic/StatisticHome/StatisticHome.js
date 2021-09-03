//Liberias
import React, {useState, useEffect} from 'react';
// import {useLocation} from 'react-router-dom';
import {Layout, Tabs, Collapse} from 'antd';

//Íconos
import {
    UserOutlined, 
    TeamOutlined, 
    RocketTwoTone, 
    EyeOutlined, 
    SettingOutlined, 
} from '@ant-design/icons';

//Componentes
import Modal from '../../../components/Modal';
import Parameter from '../../../components/Statistic/Sider/Parameter';
import Registers from '../../../components/Statistic/Registers';
import Graphs from '../../../components/Statistic/Graphs';

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
// const {Panel} = Collapse;

StatisticHome.defaultProps = {
    siderParams: defSiderParams,
}

export default function StatisticHome(props){
    
    const [elements, setElements] = useState([]); //Estudiantes o cursos
    const [reloadElements, setReloadElements] = useState(false);
    const [siderCollapsed, setSiderCollapsed] = useState(false);
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

    const onChangeOption = () => {
        
    }

    const onCollapse = () => {
        setSiderCollapsed(!siderCollapsed);
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
                
                className="sider"
                collapsible
                defaultCollapsed={false}
                collapsed={siderCollapsed}
                onCollapse={onCollapse}
                // collapsed={siderCollapsed}
                // collapsedWidth={0}
                >
                <div className="sider__logo">
                    <div>
                        {siderCollapsed?<SettingOutlined/>:'Parámetros'}
                    </div>
                </div>

                <Collapse
                    expandIconPosition='right'
                >
                    {Object.keys(siderStructure).map((el, index) => (
                        <Parameter
                            k={String(index)}
                            // key={index}
                            {...siderStructure[el]}
                            siderCollapsed={siderCollapsed}
                            onChangeOption={onChangeOption}
                        />
                    ))}
                </Collapse>
            </Sider>
            
            <Layout>
            <Tabs type="card">
                <Tabs.TabPane tab="Registros" key="0">
                    <Registers/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Gráficas" key="1">
                    <Graphs/>
                </Tabs.TabPane>
            </Tabs>
            {/* <div className="content-chooser">
                <RadioGroup className="content-chooser__radio"/>
            </div> */}
                    
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
