import {useState, useEffect} from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import {Line} from 'react-chartjs-2';

import {
    ArrowUpOutlined, 
    ArrowDownOutlined, 
    FileSearchOutlined, 
    // FrownOutlined, 
    // MehOutlined, 
    // SmileOutlined, 
    MinusOutlined, 
    ClockCircleOutlined, 
} from '@ant-design/icons';

export default function Graphs(props) {
    const [currentAverage, setCurrentAverage] = useState(0);
    const [progressAverage, setProgressAverage] = useState(0);
    const [averageTime, setAverageTime] = useState(0);

    const data = {
        labels: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        datasets:[
            {
                label: 'Estudiante1',
                data: Array.from({length: 7}, () => Math.random()*5),
                borderColor: ['rgba(255, 199, 43)'],
                backgroundColor: ['rgba(255, 199, 43)'],
                pointBackgroundColor: ['rgba(255, 199, 43)'],
                pointBorderColor: ['rgba(255, 199, 43)'],
            },
            {
                label: 'Estudiante2',
                data: Array.from({length: 7}, () => Math.random()*5),
                borderColor: ['rgba(131, 255, 110)'],
                backgroundColor: ['rgba(131, 255, 110)'],
                pointBackgroundColor: ['rgba(131, 255, 110)'],
                pointBorderColor: ['rgba(131, 255, 110)'],
            }
        ],
    }
    useEffect(() => {
        setCurrentAverage(4.3);
        setProgressAverage(11.8193);
        setAverageTime(2.9);
    }, []);

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
                <Line className="graphs__line"
                    data={data}
                    // height={200}
                    // width={200}
                    // options={{maintainAspectRatio:false}}
                />

            </div>
            </Col>
        </Row>
        </>
    );
}