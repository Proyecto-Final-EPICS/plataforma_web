import qs from 'query-string';
import { Table } from 'antd';

import { tableCustomFilters, genFilters, parseName } from '../../../libraries/General/utils';

export default function TableCourses(props) {
    const { courses, selectedRowKeys, setSelectedRowKeys } = props;
    const query = qs.parse(window.location.search);

    const data = courses.map(({ code, name, level, professors, games, period, capacity, students }, 
      index) => (
      { 
        code, name, level, period, 
        professors: professors.map(({ firstname, lastname }) => parseName(firstname, lastname)), 
        games: games.map(({ name }) => name), 
        capacity: `${students.length}/${capacity}`,
        key: index
      }
    ));

    const columns = [
      {
        title: 'Código',
        dataIndex: 'code',
        key: 'code',
      },
      {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
      },
      {
        title: 'Período',
        dataIndex: 'period',
        key: 'period',
      },
      {
        title: 'Nivel',
        dataIndex: 'level',
        key: 'level',
        filters: genFilters(data, 'level'),
      },
      {
        title: 'Profesores',
        dataIndex: 'professors',
        key: 'professors',
        ...tableCustomFilters('professors', query),
        defaultFilteredValue: query.professors ? [query.professors] : [],
        render: (_, record) => record.professors.map((professor, index) => (
            <div key={index}>{professor}</div>
        )),
        // render: (_, record) => record.professors.map((prof, index) => {
        //     const name = `${prof.firstname} ${prof.lastname}`+
        //     index==record.professors.length-1?'':', ';
        //     <span>{name}</span>
        // }),
      },
      {
        title: 'Juegos',
        dataIndex: 'games',
        key: 'games',
        render: (_, record) => record.games.map((g, index) => (
          <div key={index}>{g}</div>
        )),
      },
      {
        title: 'Capacidad',
        dataIndex: 'capacity',
        key: 'capacity',
      }
    ];
    
    return (
        <Table 
          dataSource={data} 
          columns={columns} 
          rowSelection={{
            selectedRowKeys,
            onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys)
          }}
        />
    );
}
