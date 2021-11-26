import {useState} from 'react';
import {Line, Bar} from 'react-chartjs-2';

export default function LineChartStudents(props) {
    const {students, formatData, options} = props;
    const data = formatData(students);

    data.datasets.forEach((dataset, i) => {
        dataset.label = students[i].lastname;
    })

    return (
        <Line
            data={data}
            options={options}
        />
    );
}
