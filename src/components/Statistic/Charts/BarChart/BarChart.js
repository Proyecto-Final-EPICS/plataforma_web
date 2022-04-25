import { useContext } from 'react';

import {Bar} from 'react-chartjs-2';
import StatisticHomeContext from '../.././StatisticHomeContext';

export default function BarChart(props) {
    const { query } = useContext(StatisticHomeContext);
    const { variable } = props;
    const options = getOptions(variable);
    const data = formatData(props.data, variable, query);

    return (
        <Bar
            data={data}
            options={options}
        />
    );
}

function formatData(elems, variable, query) {
    const labels = elems.map(elem => query.elem === 'est' ? elem.lastname : elem.code);
    const dataset = {};
    const data = [];

    elems.forEach(elem => {
        let media = 0;
        elem.sessions.forEach(s => {
            media += s[variable.name];
        })
        data.push(media / elem.sessions.length);
    })
    dataset.label = variable.title;
    dataset.backgroundColor = ['rgba(153, 102, 255, 0.2)'];
    dataset.data = data;

    return {labels, datasets: [dataset]}
}

function getOptions(variable) {
    const y = {};
    const {min, max} = variable;
    
    if(!isNaN(min) && !isNaN(max)){
        y.max = max;
        y.min = min;
    }

    return {
        scales: {y}
    };
}
