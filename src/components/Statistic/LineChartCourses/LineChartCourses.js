import {useState} from 'react';
import {Line} from 'react-chartjs-2';

export default function LineChartCourses(props) {
    const {courses, getLabels} = props;
    console.log(courses);

    const formatData = () => {
        const [labels, group] = getLabels();
        const datasets = [];

        courses.forEach(course => {
            const dataset = {label: course.code};
            const data = [];

            let pIndex = 0;
            const performance = course.performance;
            
            if(group === 'days') {
                labels.forEach(label => {
                    let accuracy = 0;
                    let numSessionsLabel = 0;
                    
                    while(pIndex < performance.length &&
                        new Date(performance[pIndex].date).getTime() === new Date(label.split('/').reverse().join('-')).getTime()) {
                        
                        accuracy += performance[pIndex].accuracy;
                        numSessionsLabel++;
                        pIndex++;
                    }
                    data.push(accuracy ? accuracy / numSessionsLabel : 0);
                })
            }else {
                
                let accuracy = 0;
                let numSessionsLabel = 0;
                
                labels.forEach(label => {
                    while(pIndex < performance.length && 
                        new Date(performance[pIndex].date).getTime() <= new Date(label.split('/').reverse().join('-')).getTime()) {
                        
                        accuracy += performance[pIndex].accuracy;
                        numSessionsLabel++;
                        pIndex++;
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
    return <></>
    return (
        <Line
            data={formatData()}
            options={options}
        />
    );
}
