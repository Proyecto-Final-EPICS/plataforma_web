//Librerías
import {useState, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import { Table } from 'antd';

import { getColumnSearchProps } from '../../../libraries/Components/table';

export default function TableCourse(props) {
    const {courses, selectedRowKeys, setSelectedRowKeys, location} = props;
    const query = qs.parse(useLocation().search);

    const columns = [
      {
          title: 'Código',
          dataIndex: 'code',
          key: 'code',
          ...getColumnSearchProps('code', query),
      },
      {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
          ...getColumnSearchProps('name', query),
      },
      {
          title: 'Profesores',
          dataIndex: 'professors',
          key: 'professors',
          ...getColumnSearchProps('professors', query),
          defaultFilteredValue: query.professors? [query.professors] : [],
          render: (_, record) => record.professors.map((prof, index) => (
              <div key={index}>{`${prof.firstname} ${prof.lastname}`}</div>
          )),
          // render: (_, record) => record.professors.map((prof, index) => {
          //     const name = `${prof.firstname} ${prof.lastname}`+
          //     index==record.professors.length-1?'':', ';
          //     <span>{name}</span>
          // }),
      },
    ];
    
    return (
        <Table 
          dataSource={courses.map((course, index) => (
            { ...course, key: index }
          ))} 
          columns={columns} 
          rowSelection={{
            selectedRowKeys,
            onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys)
          }}
        />
    );
}
