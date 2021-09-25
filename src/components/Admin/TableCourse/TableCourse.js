//Librerías
import {useState} from 'react';
import { Table, Input, Button, Space } from 'antd';
// import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';



export default function TableCourse(props) {
    const {courses} = props;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
        // setSearchedColumn('');
    };

    const getColumnSearchProps = dataIndex => (
        {
            filterDropdown: columnProps => (
                <FilterDropdown 
                    dataIndex={dataIndex} 
                    {...columnProps} 
                    setSearchText={setSearchText}
                    setSearchedColumn={setSearchedColumn}
                    handleSearch={handleSearch}
                    handleReset={handleReset}
                />
            ),

            filterIcon: filtered => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),

            onFilter: (value, record) => {
                // console.log(record, value);
                if(record[dataIndex]) {
                    value = value.toLowerCase()
                    
                    if (typeof record[dataIndex] !== "object"){
                        return record[dataIndex].toString().toLowerCase().includes(value)

                    }else {
                        return record[dataIndex].some(prof => (
                            `${prof.firstname} ${prof.lastname}`.toLowerCase().includes(value)
                        ))
                    }
                }else return '';
            },

            onFilterDropdownVisibleChange: () => {},

            render: text => (
                // searchedColumn === dataIndex ? (
                //     <Highlighter
                //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                //         searchWords={[searchText]}
                //         autoEscape
                //         textToHighlight={text ? text.toString() : ''}
                //     />
                // ):text
                text
            ),
      }
      );

    const data = courses.map((course, index) => (
        {
            ...course,
            key: index,
        }
    ));
    
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
            ))
            // render: (_, record) => record.professors.map((prof, index) => {
            //     const name = `${prof.firstname} ${prof.lastname}`+
            //     index==record.professors.length-1?'':', ';
            //     <span>{name}</span>
            // })
        },
      ];

    return (
        <Table dataSource={data} columns={columns}/>
    );
}

function FilterDropdown(props) {
    const {dataIndex, setSearchText, setSearchedColumn, setSelectedKeys, selectedKeys, 
        confirm, clearFilters, handleSearch, handleReset} = props;

    return (
        <div style={{ padding: 8 }}>
            <Input
                // ref={node => {
                //     searchInput = node;
                // }}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                >
                    Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        confirm({ closeDropdown: false });
                        setSearchText(selectedKeys[0]);
                        setSearchedColumn(dataIndex);
                    }}
                >
                    Filter
                </Button>
            </Space>
        </div>
    );
}

/*
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
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

class App extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '20%',
        ...this.getColumnSearchProps('age'),
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        ...this.getColumnSearchProps('address'),
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
      },
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}

ReactDOM.render(<App />, mountNode);
*/