//Librerías
import {useState, useContext} from 'react';
import { Table } from 'antd';
import LayoutAdminContext from '../LayoutAdminContext';

import { getColumnSearchProps } from '../../../libraries/Components/table';

export default function TableCourse(props) {
    const {professorFilter} = useContext(LayoutAdminContext);

    const {courses, selectedRowKeys, setSelectedRowKeys} = props;
    

    // const columns = Object.keys(courses).map((courseKey, index) => {
    //     courseKey = String(courseKey);
    //     return {
    //         title: courseKey,
    //         dataIndex: courseKey,
    //         key: courseKey,
    //         ...getColumnSearchProps(courseKey),
    //     }
    // });
    
    const columns = [
      {
          title: 'Código',
          dataIndex: 'code',
          key: 'code',
          // width: '30%',
          ...getColumnSearchProps('code'),
      },
      {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
          // width: '20%',
          ...getColumnSearchProps('name'),
      },
      {
          title: 'Profesores',
          dataIndex: 'professors',
          key: 'professors',
          ...getColumnSearchProps('professors'),
          render: (_, record) => record.professors.map((prof, index) => (
              <div key={index}>{`${prof.firstname} ${prof.lastname}`}</div>
          )),
          defaultFilteredValue: professorFilter
          // render: (_, record) => record.professors.map((prof, index) => {
          //     const name = `${prof.firstname} ${prof.lastname}`+
          //     index==record.professors.length-1?'':', ';
          //     <span>{name}</span>
          // })
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

/*
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

ReactDOM.render(<Table columns={columns} dataSource={data} onChange={onChange} />, mountNode);
*/