//Liberias
import {useState} from 'react';
import {Layout, Tabs, Button} from 'antd';

//Componentes
import MenuSider from '../../../components/Statistic/Sider/MenuSider';
import Registers from '../../../components/Statistic/Registers';
import Graphs from '../../../components/Statistic/Graphs';

// Contexto
import StatisticHomeContext from '../../../components/Statistic/StatisticHomeContext';

//Estilos
import './StatisticHome.scss';
// import ColumnGroup from 'antd/lib/table/ColumnGroup';

//...
const {Sider, Content} = Layout;

export default function StatisticHome(props){
    const [siderCollapsed, setSiderCollapsed] = useState(false);

    const onSiderCollapse = () => {
        setSiderCollapsed(!siderCollapsed);
    }

    return (
        <StatisticHomeContext.Provider value={{
            
        }}>
        <Layout>
            <Sider 
                collapsible
                collapsed={siderCollapsed}
                onCollapse={onSiderCollapse}
            >
                <MenuSider 
                    
                />
                <div style={{textAlign: 'center', marginTop: '10px'}}>
                    {!siderCollapsed?<Button>Aplicar cambios</Button>:null}
                </div>
            </Sider>
            <Layout>
                <Content>
                    <Tabs type="card">
                        <Tabs.TabPane tab="Registros" key="0">
                            <Registers/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Gráficas" key="1">
                            <Graphs/>
                        </Tabs.TabPane>
                    </Tabs> 
                </Content>
            </Layout>
        </Layout>
        </StatisticHomeContext.Provider>
    );

}
