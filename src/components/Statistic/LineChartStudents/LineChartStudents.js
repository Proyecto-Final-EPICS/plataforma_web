import {useState} from 'react';
import {Line} from 'react-chartjs-2';

export default function LineChartStudents(props) {
    const {students, getLabels} = props;

    const formatData = () => {
        // console.log(getLabels());
        const [labels, group] = getLabels();
        const datasets = [];

        students.forEach(student => {
            // console.log(student.lastname);
            const dataset = {label: student.lastname};
            const data = [];

            let sIndex = 0;
            const sessions = student.sessions;
            
            if(group === 'days') {
                labels.forEach(label => {
                    let accuracy = 0;
                    let numSessionsLabel = 0;
                    
                    while(sIndex < sessions.length &&
                        new Date(sessions[sIndex].date).getTime() === new Date(label.split('/').reverse().join('-')).getTime()) {
                        
                        accuracy += sessions[sIndex].accuracy;
                        numSessionsLabel++;
                        sIndex++;
                    }
                    data.push(accuracy ? accuracy / numSessionsLabel : 0);
                })
            }else {
                
                let accuracy = 0;
                let numSessionsLabel = 0;
                
                labels.forEach(label => {
                    while(sIndex < sessions.length && 
                        new Date(sessions[sIndex].date).getTime() <= new Date(label.split('/').reverse().join('-')).getTime()) {
                        
                        accuracy += sessions[sIndex].accuracy;
                        numSessionsLabel++;
                        sIndex++;
                    }
                    data.push(accuracy ? accuracy / numSessionsLabel : 0);
                    accuracy = 0;
                    numSessionsLabel = 0;
                })
                data.push(accuracy ? accuracy / numSessionsLabel : accuracy);
            }
            dataset.data = data;
            const [r, g, b] = [parseInt(Math.random()*255), parseInt(Math.random()*255), parseInt(Math.random()*255)];
            dataset.borderColor = [`rgba(${r}, ${g}, ${b})`];
            dataset.backgroundColor = [`rgba(${r}, ${g}, ${b}, 0.2)`];
            
            datasets.push(dataset);
        });
        // console.log(datasets);
        return {labels, datasets};
    }

    const options = {
        title: {
            display: true,
            text: 'Accuracy'
        },
    }
    
    return (
        <Line
            data={formatData()}
            options={options}
        />
    );
}
