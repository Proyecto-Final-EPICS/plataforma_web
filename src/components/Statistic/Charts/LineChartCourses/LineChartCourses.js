import {useState} from 'react';
import {Line} from 'react-chartjs-2';

export default function LineChartCourses(props) {
    const {courses, formatData, options} = props;
    const data = formatData(courses);
    
    data.datasets.forEach((dataset, i) => {
        dataset.label = courses[i].code;
    })

    return (
        <Line
            data={data}
            options={options}
        />
    );
}
