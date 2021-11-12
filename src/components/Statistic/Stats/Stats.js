import {useState, useEffect} from 'react';

import LineChart from '../LineChart';
import {Line, Bar} from 'react-chartjs-2';
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
    const [currentAverage, setCurrentAverage] = useState(4.3);
    const [progressAverage, setProgressAverage] = useState(11.8193);
    const [averageTime, setAverageTime] = useState(2.9);
    const [graphType, setGraphType] = useState('line');

    const displayGraphOptions = () => {
        setGraphType(graphType=='line'?'bar':'line');
    }

    const data = {
        labels: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        datasets:[
            {
                label: 'Estudiante1',
                data: Array.from({length: 7}, () => Math.random()*5),
                borderColor: ['rgba(255, 199, 43)'],
                backgroundColor: ['rgba(255, 199, 43)'],
                // pointBackgroundColor: ['rgba(255, 199, 43)'],
                // pointBorderColor: ['rgba(255, 199, 43)'],
            },
            {
                label: 'Estudiante2',
                data: Array.from({length: 7}, () => Math.random()*5),
                borderColor: ['rgba(131, 255, 110)'],
                backgroundColor: ['rgba(131, 255, 110)'],
                // pointBackgroundColor: ['rgba(131, 255, 110)'],
                // pointBorderColor: ['rgba(131, 255, 110)'],
            },
        ],
    }

    const options = {
        title: {
            display: true,
            text: 'Average Grades'
        },
        scales: {
            yAxes: [
                {
                    tricks: {
                        min: 0,
                        max: 5,
                        stepSize: 0.5,
                    }
                },
            ],
        },
    }
    
    return(
        <>
        <Row gutter={10}>
            <Col span={8}>
            <div className="section stats">
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                    <div className="stats__item">
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
                    <div className="stats__item">
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
                    <div className="stats__item">
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
            <div className="section graphs">
                {/* <LineChart
                    data={data}
                /> */}
                {graphType=='line'?
                <Line className="graphs__line"
                    data={data}
                    options={options}
                    // width={1000}
                    // height={600}
                />
                :
                <Bar className="graphs__line"
                    data={data}
                    options={options}
                    // width={1000}
                    // height={600}
                />}
                <Button 
                    className="graphs__options" 
                    icon={<EditOutlined/>} 
                    shape="circle" 
                    size="large"
                    onClick={displayGraphOptions}
                />
            </div>
            </Col>
        </Row>
        </>
    );
}