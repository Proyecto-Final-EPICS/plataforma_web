import {useState, useEffect} from 'react';

import LineChartCourses from '../LineChartCourses';
import LineChartStudents from '../LineChartStudents';
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

const MAX_LABELS = 20;

export default function Stats(props) {
    const {data, query} = props;
    const [currentAverage, setCurrentAverage] = useState(4.3);
    const [progressAverage, setProgressAverage] = useState(11.8193);
    const [averageTime, setAverageTime] = useState(2.9);
    
    const getLabels = () => {
        const from = new Date(query.from.split('-').reverse()),
            to = new Date(query.to.split('-').reverse());
        const labels = [];
        const now = from;
        
        let group;
        const days = (to.getTime() - from.getTime()) / 1000 / 3600 / 24 + 1;
        // console.log(days);
        if(days <= MAX_LABELS) {
            for(let i = 0; i < days; i++) {
                labels.push(now.toLocaleDateString());
                // labels.push(now.toLocaleDateString().split('/').reverse().join('/'));
                now.setDate(now.getDate() + 1);
            }
            group = "days";
        }else {
            const weeks = Math.ceil((to.getTime() - from.getTime()) / 1000 / 3600 / 24 / 7);
            if(weeks <= MAX_LABELS) {
                for(let i = 0; i < weeks; i++) {
                    labels.push(now.toLocaleDateString());
                    now.setDate(now.getDate() + 7);
                }
                labels.push(to.toLocaleDateString())
                group = "weeks";
            } else {
                const months = Math.floor((to.getTime() - from.getTime()) / 1000 / 3600 / 24 / 30);
                for(let i = 0; i < months; i++) {
                    labels.push(now.toLocaleDateString());
                    now.setMonth(now.getMonth() + 1);
                }
                labels.push(to.toLocaleDateString())
                group = "months";
            }
        }

        return [labels, group];
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
                {query.elem === 'cur' ?
                    <LineChartCourses
                        courses={data[0]}
                        getLabels={getLabels}
                    />
                :
                    <LineChartStudents
                        students={data[1]}
                        getLabels={getLabels}
                    />
                }
            </div>
            </Col>
        </Row>
        </>
    );
}