import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Button, Dropdown, Menu, Space} from 'antd';
import { DownOutlined, LeftOutlined } from '@ant-design/icons';

import CheckGroup from './../../../components/General/Input/CheckGroup';

import './GamesFilters.scss';

export default function GamesFilters(props) {

    const [categoriesVisible, setCategoriesVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [levelVisible, setLevelVisible] = useState(false);
    const [levels, setLevels] = useState([]);
    const [orders, setOrders] = useState(initOrders());
    const [ordersVisible, setOrdersVisible] = useState(false);

    useEffect(() => {
        setCategories(initCategories());
        setLevels(initLevels());
        // setOrders(initOrders());
    }, []);

    const getOrderSel = () => orders.find(o => o.sel).name;

    const dropDownMenus = [
        {
            text: 'Categorías',
            icon: <DownOutlined/>,
            visible: categoriesVisible,
            onVisibleChange: flag => setCategoriesVisible(flag),
            menu: <CheckGroupFilter 
                name='categories' 
                options={categories} 
                setOptions={setCategories}
            />,
        },
        {
            text: 'Nivel',
            icon: <DownOutlined/>,
            visible: levelVisible,
            onVisibleChange: flag => setLevelVisible(flag),
            // menu: <Levels levels={levels} setLevels={setLevels}/>,
            menu: <CheckGroupFilter 
                name='levels' 
                options={levels} 
                setOptions={setLevels}
            />,
        },
        {
            text: getOrderSel(),
            icon: <DownOutlined/>,
            visible: ordersVisible,
            onVisibleChange: flag => setOrdersVisible(flag),
            menu: <OrdersFilter
                orders={orders}
                setOrders={setOrders}
                setOrdersVisible={setOrdersVisible}
            />,
        },
    ]
    
    return (
        <div className="professor-games-filters">
        <Space direction="horizontal">
            {dropDownMenus.map((elem, index) => {
                
                const {text, icon, menu, visible, onVisibleChange} = elem;
                return (
                    <Dropdown
                        className="professor-games-filters__drop-down"
                        overlay={menu} 
                        visible={visible}
                        onVisibleChange={onVisibleChange}
                        key={index}
                    >
                        <div>{text}{"   "}{icon}</div>
                    </Dropdown>
                );
            })}
        </Space>
        </div>
    );
}

function CheckGroupFilter(props) {
    const {name, options, setOptions} = props;

    const getNames = () => options.map(c => c.name);
    const getChecked = () => (
        options.filter(c => c.checked).map(c => c.name)
    );

    const update = (_, config) => {
        // setOptions(options.map(c => {
        //     const {name} = c;
        //     return {
        //         name, 
        //         checked: config.includes(c.name)
        //     }
        // }));
        setOptions(options.map(c => (
            {
                ...c,
                checked: config.includes(c.name)
            }
        )));
    }

    return (
        <Menu className="games-filter">
            <CheckGroup
                name={name}
                options={getNames()}
                checked={getChecked()}
                update={update}
            />
        </Menu>
    );
}

function OrdersFilter(props) {
    const {orders, setOrders, setOrdersVisible} = props;
    
    const update = e => {
        setOrdersVisible(false);
        setOrders(orders.map((o, i) => (
            {
                ...o,
                sel: e.key == i,
            }
        )))
    }

    return (
        <Menu onClick={update}>
            {orders.map((order, index) => (
                <Menu.Item key={index}>{order.name}</Menu.Item>
            ))}
        </Menu>
    );
}

function initCategories() {
    return [
        {
            name: "Speaking",
            checked: true,
        },
        {
            name: "Listening",
            checked: true,
        },
        {
            name: "Writing",
            checked: true,
        },
        {
            name: "Reading",
            checked: true,
        },
    ]
}

function initLevels() {
    return [
        {
            name: 'C2',
            checked: true,
        },
        {
            name: 'C1',
            checked: true,
        },
        {
            name: 'B2',
            checked: true,
        },
        {
            name: 'B1',
            checked: true,
        },
        {
            name: 'A2',
            checked: true,
        },
        {
            name: 'A1',
            checked: true,
        },
    ]
}

function initOrders() {
    return [
        {
            name: 'Más usados',
            sel: true,
        },
        {
            name: 'Más recientes',
            sel: false,
        },
        {
            name: 'Más antiguos',
            sel: false,
        },
    ]
}
