import {useState} from 'react';
import {Bar} from 'react-chartjs-2';

export default function BarChartCourses(props) {
    const {courses, formatData, options} = props;
    const data = formatData(courses);

    return (
        <Bar
            data={data}
            options={options}
        />
    );
}
