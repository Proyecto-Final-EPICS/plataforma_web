//Librerías
import {Input, Button, Space} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';

//Custom filter
export function getColumnSearchProps(dataIndex){

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    
    const handleReset = clearFilters => {
        clearFilters();
        // setSearchText('');
        // setSearchedColumn('');
    };

    return {
        filterDropdown: columnProps => (
            <FilterDropdown 
                dataIndex={dataIndex} 
                {...columnProps} 
                // setSearchText={setSearchText}
                // setSearchedColumn={setSearchedColumn}
                handleSearch={handleSearch}
                handleReset={handleReset}
            />
        ),

        filterIcon: filtered => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),

        onFilter: (value, record) => {
            if(record[dataIndex]) {
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
            }else return '';
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
                            // setSearchText(selectedKeys[0]);
                            // setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        );
    }
};

//Selection and operation
export function rowSelection(selectedRowKeys, setSelectedRowKeys) {

    return {
        selectedRowKeys,
        onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys)
    }
}
