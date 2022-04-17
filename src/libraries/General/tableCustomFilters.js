//Librerías
import {Input, Button, Space} from 'antd';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';

//Custom filter
export function tableCustomFilters(dataIndex, query){
    let searchBtn;

    const handleSearch = confirm => {
        confirm();
    };
    
    const handleReset = clearFilters => {
        clearFilters();
    };

    // const handleSearchLink = (location, selectedKeys) => {
    //     if(selectedKeys[0]) {
    //         console.log('a');
    //         query = {
    //             ...query,
    //             professors: selectedKeys[0],
    //         }
    //         console.log(query);
    //     }else {
    //         console.log('b');
    //         const temp = query;
    //         query = {};
    //         for(let key in temp) if(key !== 'professors') query[key] = temp[key];
            
    //         // console.log(location);
    //         return {
    //             ...location,
    //             pathname: '/director/courses',
    //             search: qs.stringify(query),
    //         }
    //     }
    // }

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

        // onFilterDropdownVisibleChange: () => {},

        // render: text => (
        //     // searchedColumn === dataIndex ? (
        //     //     <Highlighter
        //     //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //     //         searchWords={[searchText]}
        //     //         autoEscape
        //     //         textToHighlight={text ? text.toString() : ''}
        //     //     />
        //     // ):text
        //     text
        // ),
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
                    {/* <Link to={(location) => handleSearchLink(location, selectedKeys)}> */}
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

                    {/* <Link to={(location) => handleSearchLink(location, selectedKeys)}> */}
                    <Link to={{
                        pathname: '/home/courses',
                        search: qs.stringify({
                            ...query,
                            [dataIndex]: undefined,
                        }),
                    }}>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Limpiar
                    </Button>
                    </Link>
                </Space>
            </div>
        );
    }
};
