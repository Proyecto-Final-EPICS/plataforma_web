//Librerías
import { Input, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { SearchOutlined } from '@ant-design/icons';

export function tableCustomFilters(dataIndex, query) {
    let searchBtn;
    const handleSearch = confirm => confirm();
    const handleReset = clearFilters => clearFilters();

    return {
        filterDropdown: columnProps => (
            <FilterDropdown 
                dataIndex={dataIndex} 
                {...columnProps} 
                handleSearch={handleSearch}
                handleReset={handleReset}
            />
        ),

        filterIcon: filtered => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),

        onFilter: (value, record) => {
            if(value) {
                value = value.trim().toLowerCase();

                switch(typeof record[dataIndex]) {
                    case "string":
                        return record[dataIndex].toString().toLowerCase().includes(value);
                    case "object":
                        return record[dataIndex].some(prof => (
                            `${prof.firstname} ${prof.lastname}`.toLowerCase().includes(value)
                        ));
                }
                return false;
            }else return true;
        },
    }

    function FilterDropdown(props) {
        const {dataIndex, setSelectedKeys, selectedKeys, 
            confirm, clearFilters, handleSearch, handleReset} = props;
        
        const placeholder =
            dataIndex=='code'?'por código':
            dataIndex=='name'?'por nombre':
            dataIndex=='professors'?'profesor':'';
        
            return (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Buscar ${placeholder}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    onPressEnter={() => searchBtn.click()}
                    style={{ marginBottom: 8, display: 'block' }}
                />

                <Space>
                    <Link to={{
                        pathname: '/home/courses',
                        search: qs.stringify({
                            ...query,
                            [dataIndex]: selectedKeys[0],
                        }),
                    }}>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                        ref={node => searchBtn = node}
                    >
                        Buscar
                    </Button>
                    </Link>

                    <Link to={{
                        pathname: '/home/courses',
                        search: qs.stringify({
                            ...query,
                            [dataIndex]: undefined,
                        }),
                    }}>
                    <Button 
                        onClick={() => handleReset(clearFilters)} 
                        size="small" 
                        style={{ width: 90 }}
                    >
                        Limpiar
                    </Button>
                    </Link>
                </Space>
            </div>
        );
    }
};

export function statisticFilterElems(sessionsApi, query, courseApi, studentApi) {
    console.log(sessionsApi);
    console.log(query);
    // Límites de fecha
    const from = new Date(query.from.split('-').reverse()).getTime(), 
        to = new Date(query.to.split('-').reverse()).getTime();
    
    // Filtrado de sesiones por fecha
    const sessions = sessionsApi.filter(s => {
        if (query.game != s.game.code) return false;
        
        const date = new Date(s.endTime).getTime();
        return date >= from && date <= to;
    });
    
    // console.log(sessions);
    // Filtrado de los juegos de las sesiones
    // sessions.forEach(s => s.games = s.games.filter(g => query.game.includes(g.code)));

    // Filtrado de cursos
    const courses = courseApi
        .filter(c => query.cur.includes(c.code))
        .map(c => ({ ...c, sessions: [] }));

    let students = [];
    sessions.forEach(session => {
        // Buscamos si este estudiante ya fue añadido
        let student = students.find(s => s.username === session.student.username);
        if(!student) { //Si no, lo añadimos
            // student = {...session.student};
            const { student: { username, first_name: firstname, last_name: lastname, course } } = session;
            student = { username, firstname, lastname, course, sessions: [] };

            // Si el estudiante no pertenece a ningún curso, se descarta
            if(!courses.some(c => c.code === student.course)) return;
            students.push(student);
        }
        console.log(student.username);

        // Se añade más data
        const { identity_doc, gender, age } = studentApi.find(s => s.username === student.username);
        student.identity_doc = identity_doc;
        student.gender = gender;
        student.age = age;
        
        const date = session.endTime;
        const totTime = (new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) 
            / 1000 / 3600;
        let accuracy = session.game.score / 100;
        // const numLevels = session.game.levels.length;

        // session.game.levels.forEach(level => accuracy += level.accuracy);
        // accuracy = numLevels && accuracy / numLevels;

        // Se almacenan los datos de la sesión en cada array
        student.sessions.push({ date, totTime, accuracy });
        const course = courses.find(c => c.code === student.course);
        if(course) course.sessions.push({ date, totTime, accuracy });
    });

    // Se tienen en cuenta sólo cursos con sesiones
    return [courses.filter(c => c.sessions.length), students];
}

// https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
export function getAgeFromBirthDate(birthDate) {
    const today = new Date();
    birthDate = new Date(birthDate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    return age;
}

export function parseName(firstname, lastname) {
    return `${firstname.split()[0]} ${lastname.split()[0]}`;
}

export function parsePhone({country_code, number}) {
    return `+${country_code} ${number}`;
}

export function parseLocation({city, region, country}) {
    return `${city}, ${region}, ${country}`;
}

export function genFilters (col, prop) {
    const filters = [];
    col.forEach(el => {
        if(!filters.some(f => f.value === el[prop])) {
            filters.push({
                text: el[prop],
                value: el[prop],
            });
        }
    });
    
    return filters;
}
