import {useState} from 'react';
import {Bar} from 'react-chartjs-2';

export default function BarChartStudents(props) {
    const {students, formatData, options} = props;
    const data = formatData(students);

    return (
        <Bar
            data={data}
            options={options}
        />
    );
}
