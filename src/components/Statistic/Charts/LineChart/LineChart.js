import { useContext } from 'react';

import { Line } from 'react-chartjs-2';
import StatisticHomeContext from '../.././StatisticHomeContext';

const MAX_LABELS = 20;

export default function LineChart(props) {
    const { variable } = props;
    const { query } = useContext(StatisticHomeContext);
    const options = getOptions(variable);
    const data = formatData(props.data, variable, query);

    return (
        <Line
            data={data}
            options={options}
        />
    )
}

function formatData(elems, variable, query) {
    const [labels, group] = getLabels(query);
    const datasets = [];

    elems.forEach(elem => {
        const dataset = {};
        const data = [];

        let sIndex = 0;
        const sessions = elem.sessions;
        
        if(group === 'days') {
            labels.forEach(label => {
                let media = 0;
                let numSessionsLabel = 0;
                
                while(sIndex < sessions.length &&
                    new Date(sessions[sIndex].date).getTime() === 
                    new Date(label.split('/').reverse().join('-')).getTime()) {
                    
                    media += sessions[sIndex][variable.name];
                    numSessionsLabel++;
                    sIndex++;
                }
                data.push(media && media / numSessionsLabel);
            })
        }else {
            let media = 0;
            let numSessionsLabel = 0;
            
            labels.forEach(label => {
                while(sIndex < sessions.length && 
                    new Date(sessions[sIndex].date).getTime() <= new Date(label.split('/').reverse().join('-')).getTime()) {
                    
                    media += sessions[sIndex][variable.name];
                    numSessionsLabel++;
                    sIndex++;
                }
                data.push(media ? media / numSessionsLabel : 0);
                media = 0;
                numSessionsLabel = 0;
            })
            data.push(media ? media / numSessionsLabel : media);
        }
        dataset.data = data;
        // dataset.label = elem.lastname || elem.code;
        if(query.elem == 'cur') dataset.label = elem.code;
        else dataset.label = elem.lastname;

        const rand = () => parseInt(100 + Math.random() * 125);
        
        const [r, g, b] = [rand(), rand(), rand()];
        dataset.borderColor = [`rgba(${r}, ${g}, ${b})`];
        dataset.backgroundColor = [`rgba(${r}, ${g}, ${b}, 0.2)`];
        
        datasets.push(dataset);
    });
    
    return {labels, datasets};
}

function getLabels(query) {
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

function getOptions(variable) {
    const y = {}
    const {min, max} = variable;
    
    if(!isNaN(min) && !isNaN(max)){
        y.max = max;
        y.min = min;
    }

    return {
        scales: {y}
    };
}
