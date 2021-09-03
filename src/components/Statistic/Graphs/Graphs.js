import {useState, useEffect} from 'react';
import { Statistic, Card, Row, Col } from 'antd';
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

    useEffect(() => {
        setCurrentAverage(4.3);
        setProgressAverage(11.8193);
        setAverageTime(2.9);
    }, []);

    return(
        <div className="container">
            <div className="container__stat-prom">
                
                <Row gutter={5}>
                    <Col span={12}>
                    <Statistic
                        title="Promedio Actual"
                        value={currentAverage}
                        // prefix={currentAverage<3.0?<FrownOutlined/>:currentAverage<4.0?
                        //     <FrownOutlined/>:<SmileOutlined/>}
                        prefix={<FileSearchOutlined/>}
                        suffix="/ 5.0"
                    />
                    </Col>
                    <Col span={12}>
                    <Card>
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
                    </Card>
                    </Col>
                </Row>
            </div>
            <div className="container__stat-time">
                
            <Statistic
                title="Tiempo Promedio"
                value={averageTime}
                prefix={<ClockCircleOutlined/>}
                suffix="horas por día"
            />
            </div>
            <div className="container__graphs">
                c
            </div>
        </div>
    );
}