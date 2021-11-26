// import BarChartCourses from '../BarChartCourses';
// import BarChartStudents from '../BarChartStudents';
import {Bar} from 'react-chartjs-2';

export default function BarChart(props) {
    const {query, data, variable} = props;
    const [courses, students] = data;
    const options = initOptions();

    function initOptions() {
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


    const getLabels = elems => elems.map(elem => (
        query.elem === 'est' ? elem.lastname : elem.code
    ))

    const formatData = elems => {
        const labels = getLabels(elems);
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
        // console.log(variable);
        dataset.backgroundColor = ['rgba(153, 102, 255, 0.2)'];
        dataset.data = data;

        return {labels, datasets: [dataset]}
    }

    return (
        <Bar
            data={formatData(query.elem === 'cur' ? courses : students)}
            options={options}
        />
    );

    {/* return (
        <>
        {query.elem === 'cur' ?
        <BarChartCourses
            courses={courses}
            formatData={formatData}
            options={options}
        />
        :
        <BarChartStudents
            students={students}
            formatData={formatData}
            options={options}
        />
        }
        </>
    ); */}
}
