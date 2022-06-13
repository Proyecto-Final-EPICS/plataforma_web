//Librerías
import { Link } from 'react-router-dom';

import { Table, Button } from 'antd';
import qs from 'query-string';

import { tableCustomFilters, genFilters, parseName } from '../../../libraries/General/utils';

export default function TableGames(props) {
    const { games } = props;
    const query = qs.parse(window.location.search);
    
    const data = games.map(({ code, name, level, topic, modules, devs }, index) => (
      { 
        code, name, level, topic, 
        devs: devs.map(({ firstname, lastname }) => parseName(firstname, lastname)),
        modules: modules.map(({ name }) => name), 
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
        title: 'Nivel',
        dataIndex: 'level',
        key: 'level',
        filters: genFilters(data, 'level'),
      },
      {
        title: 'Modulos',
        dataIndex: 'modules',
        key: 'modules',
        // ...tableCustomFilters('modules', query),
        // defaultFilteredValue: query.skill ? [query.skill] : [],
        render: (_, record) => record.modules.map((m, index) => (
          <div key={index}>{m}</div>
        )),
      },
      {
        title: 'Tópico',
        dataIndex: 'topic',
        key: 'topic',
        // ...tableCustomFilters('topics', query),
        // defaultFilteredValue: query.topic ? [query.topic] : [],
        // render: (_, record) => record.topics.map((t, index) => (
        //   <div key={index}>{t}</div>
        // )),
      },
      {
        title: 'Desarrolladores',
        dataIndex: 'devs',
        key: 'devs',
        render: (_, record) => record.devs.map((d, index) => (
          <div key={index}>{d}</div>
        )),
      },
      {
        "title": "Acción",
        "key": "action",
        render: (_, record) => (
            <Link to={`/games/${record.code}`}>
              <Button 
                  className='button-purple'
                  type="primary" 
              >
                Ver más
              </Button>
            </Link>
        )
      },
    ];
    
    return (
        <Table 
          dataSource={data} 
          columns={columns} 
        />
    );
}
