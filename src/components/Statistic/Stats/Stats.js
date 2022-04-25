import { useState } from 'react';

import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import ChartSettings from '../ChartSettings';
import Modal from '../../General/Modal';
import { Statistic, Card, Row, Col, Button } from 'antd';

import {
    ArrowUpOutlined, 
    ArrowDownOutlined, 
    FileSearchOutlined, 
    // FrownOutlined, 
    // MehOutlined, 
    // SmileOutlined, 
    MinusOutlined, 
    ClockCircleOutlined, 
    EditOutlined, 
} from '@ant-design/icons';

export default function Stats(props) {
    const variables = getVariables();

    const { data } = props;
    const [chartType, setChartType] = useState('line');
    const [variable, setVariable] = useState(variables[0]);
    const [modalContent, setModalContent] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [btnOptionsVisible, setBtnOptionsVisible] = useState(false); 

    const [currentAverage, setCurrentAverage] = useState(4.3);
    const [progressAverage, setProgressAverage] = useState(11.8193);
    const [averageTime, setAverageTime] = useState(2.9);

    const openSettings = () => {
        setModalContent(
            <ChartSettings
                type={chartType}
                setType={setChartType}
                variable={variable}
                setVariable={name => setVariable(variables.find(v => v.name === name))}
                setIsModalVisible={setIsModalVisible}
            />
        )
        setIsModalVisible(true);
    }
    
    return (
        <>
        <Modal
            isVisible={isModalVisible}
            setIsVisible={setIsModalVisible}
        >
            {modalContent}
        </Modal>
        <Row className="stats" gutter={10}>
            <Col span={8}>
            <div>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                    <div>
                    <Statistic
                        title="Promedio Actual"
                        value={currentAverage}
                        // prefix={currentAverage<3.0?<FrownOutlined/>:currentAverage<4.0?
                        //     <FrownOutlined/>:<SmileOutlined/>}
                        prefix={<FileSearchOutlined/>}
                        suffix="/ 5.0"
                    />
                    </div>
                    </Col>
                    <Col span={12} >
                    <div>
                    <Statistic
                        title="Evolución del Promedio"
                        value={progressAverage}
                        precision={2}
                        valueStyle={progressAverage>0?{color:'#3f8600'}:progressAverage==0?
                        {color:'#fff'}:{color:'#cf1322'}}
                        prefix={progressAverage>0?<ArrowUpOutlined/>:progressAverage==0?
                        <MinusOutlined/>:<ArrowDownOutlined/>}
                        suffix="%"
                    />
                    </div>
                    </Col>
                    <Col span={24}>
                    <div>
                    <Statistic
                        title="Tiempo Promedio"
                        value={averageTime}
                        prefix={<ClockCircleOutlined/>}
                        suffix="horas por día"
                    />
                    </div>
                    </Col>
                </Row>
            </div>
            </Col>
            <Col span={16} >
            <div className="stats__chart"
                // onMouseOver={() => !btnOptionsVisible && setBtnOptionsVisible(true)}
                // onMouseLeave={() => btnOptionsVisible && setBtnOptionsVisible(false)}
            >
                {chartType === 'line'?
                <LineChart
                    data={data}
                    variable={variable}
                />
                :chartType === 'bar'?
                <BarChart
                    data={data}
                    variable={variable}
                />
                :null
                }
                <Button 
                    className="stats__chart__btn"
                    icon={<EditOutlined/>} 
                    shape="circle" 
                    size="large"
                    onClick={openSettings}
                    style={{visibility: btnOptionsVisible ? 'visible' : 'hidden'}}
                />
            </div>
            </Col>
        </Row>
        </>
    );
}

function getVariables() {
    return [
        {
            name: 'accuracy',
            title: 'Precisión',
            min: 0,
            max: 1,
        },
        {
            name: 'totTime',
            title: 'Tiempo Empleado (horas)',
            min: 0,
            max: NaN,
        },
    ];
    // return {
    //     accuracy: {
    //         title: 'Precisión',
    //         y: {min: 0, max: 1},
    //     },
    //     totTime: {
    //         title: 'Precisión',
    //         y: {min: 0, max: 1},
    //     }
    // }
}
