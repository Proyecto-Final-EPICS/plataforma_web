//Liberias
import {useState, useEffect} from 'react';
import {Layout, Tabs, Collapse} from 'antd';

//Íconos
import {SettingOutlined} from '@ant-design/icons';

//Componentes
import Modal from '../../../components/Modal';
import Parameter from '../../../components/Statistic/Sider/Parameter';
import Registers from '../../../components/Statistic/Registers';
import Graphs from '../../../components/Statistic/Graphs';

//Recursos
import defSiderStructure, {TYPES} from '../assets/defSiderStructure';
import defSiderParams from '../assets/defSiderParams.json';

//API
// import {getEstudiantesByColegio} from '../../../api/colegio';

//Estilos
import './StatisticHome.scss';
// import ColumnGroup from 'antd/lib/table/ColumnGroup';

//...
const {Sider} = Layout;

export default function StatisticHome(props){

    const siderParams = props.siderParams || defSiderParams;
    
    const [elements, setElements] = useState([]); //Estudiantes o cursos
    const [reloadElements, setReloadElements] = useState(false);
    const [siderCollapsed, setSiderCollapsed] = useState(false);
    const [siderStructure, setSiderStructure] = useState({}); //Parámetros del sider
    const [vista, setVista] = useState('tabla');

    //Constantes para el modal
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const onParameterModified = ({param, option, sel, checkOperation}) => {
        
        const temp = [...siderStructure];

        if(temp[param].type == TYPES.CHECK_GROUP) {
            
            if(checkOperation !== undefined) {
                for(let op in temp[param].options) {
                    
                    if(temp[param].options[op].sel != checkOperation)
                        temp[param].options[op].sel = checkOperation;
                
                }
            }else temp[param].options[option].sel = sel;

            setSiderStructure(temp);

        }else if(temp[param].type == TYPES.RADIO_GROUP) {
            
            for(let op in temp[param].options) {
                
                // if(temp[param].options[op].sel) temp[param].options[op].sel = false;
                if(op != option) temp[param].options[op].sel = false;
            }
            temp[param].options[option] = true
            
            setSiderStructure(temp);

        }else if(siderStructure[param].type == TYPES.PERIOD_PICKER) {
            // setSiderStructure({
            //     ...siderStructure,
    
            // });
        }
    }

    const onCollapse = () => {
        setSiderCollapsed(!siderCollapsed);
    }

    useEffect(() => {
        receiveParams(siderParams, setSiderStructure);
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
                    {Object.keys(siderStructure).map((param, index) => (
                        <Parameter
                            k={index}
                            {...param}
                            siderCollapsed={siderCollapsed}
                            onParameterModified={onParameterModified}
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

const receiveParams = (siderParams, setSiderStructure) => {
    const siderStructure = defSiderStructure;

    for (let p in siderParams) {
        
        if(siderParams[p] === null) continue;

        if(siderStructure[p].type == TYPES.CHECK_GROUP) {
            if(siderParams[p] === true){
                for(let op in siderStructure[p].options) {
                    siderStructure[p].options[op].sel = true;
                }
            }else {
                for(let op of siderParams[p]) {
                    siderStructure[p].options[op].sel = true
                }
            }

        }else if(siderStructure[p].type == TYPES.RADIO_GROUP) {
            
            siderStructure[p].options[siderParams[p]] = true;

        }else if(siderStructure[p].type == TYPES.PERIOD_PICKER) {
            // ...
        }
    }
    setSiderStructure(siderStructure);
}