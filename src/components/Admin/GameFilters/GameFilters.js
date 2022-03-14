import {useState, useEffect} from 'react';
import {Checkbox, Dropdown, Menu, Space} from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './GameFilters.scss';

// import CheckGroup from './../../../components/General/Input/CheckGroup';

export default function GameFilters(props) {

    const [categoriesVisible, setCategoriesVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [levelVisible, setLevelVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterText, setFilterText] = useState([]);

    useEffect(() => {
        setCategories(initCategories());
        setFilterText(initFilterText());
    }, []);

    const getFilterTextSel = () => filterText.find(f => f.sel).title;

    const dropDownMenus = {
        categories: {
            text: 'Categorías',
            icon: <DownOutlined/>,
            visible: categoriesVisible,
            onVisibleChange: flag => setCategoriesVisible(flag),
            menu: <Categories categories={categories} setCategories={setCategories}/>,
        },
        level: {
            text: 'Nivel',
            icon: <DownOutlined/>,
            visible: levelVisible,
            onVisibleChange: flag => setLevelVisible(flag),
            menu: (
                <Menu>
                    <Menu.Item>
                    <Checkbox>C2</Checkbox>
                    </Menu.Item>
                    <Menu.Item>
                    <Checkbox>C1</Checkbox>
                    </Menu.Item>
                    <Menu.Item>
                    <Checkbox>B2</Checkbox>
                    </Menu.Item>
                    <Menu.Item>
                    <Checkbox>B1</Checkbox>
                    </Menu.Item>
                    <Menu.Item>
                    <Checkbox>A2</Checkbox>
                    </Menu.Item>
                    <Menu.Item>
                    <Checkbox>A1</Checkbox>
                    </Menu.Item>
                    <br/>
                    <Menu.Item>
                    <Checkbox>Todos</Checkbox>
                    </Menu.Item>
                </Menu>
            ),
        },
        usage: {
            text: filterText,
            icon: <DownOutlined/>,
            visible: filterVisible,
            onVisibleChange: flag => setFilterVisible(flag),
            menu: (
                <Menu 
                    onClick={(e) => {
                        setFilterVisible(false);
                        setFilterText(
                            e.key == "1"?
                            "Más usados":e.key == "2"?
                            "Más recientes":"Más antiguos"
                        )
                    }}
                >
                    <Menu.Item key="1">Más usados</Menu.Item>
                    <Menu.Item key="2">Más recientes</Menu.Item>
                    <Menu.Item key="3">Más antiguos</Menu.Item>
                </Menu>
            ),
        },
    }
    
    return (
        <div className="nav-bar">
        <Space direction="horizontal">
            {Object.keys(dropDownMenus).map((elem, index) => {
                // console.log(elem);
                const {text, icon, menu, visible, onVisibleChange} = dropDownMenus[elem];
                return (
                    <Dropdown
                        className="nav-bar__drop-down"
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

function Categories(props) {
    const {categories, setCategories} = props;

    const onCheckAll = () => {
        setCategories(categories.map(c => {


            // return {
            //     namec.title
            // }
        }));
    }

    return (
        <Menu>
            {categories.map((el, index) => (
                <Menu.Item>
                <Checkbox
                    key={index} 
                    checked={el.checked}
                    // onChange={setCategories([[...categories], {}])}
                >
                    {el.title}
                </Checkbox>
                </Menu.Item>
            ))}
            <br/>
            <Menu.Item>
            <Checkbox onChange={e => onCheckAll(e.target.checked)}>Todos</Checkbox>
            </Menu.Item>
        </Menu>
    );
}

function initCategories() {
    return [
        {
            title: "Speaking",
            checked: false,
        },
        {
            title: "Listening",
            checked: false,
        },
        {
            title: "Writing",
            checked: false,
        },
        {
            title: "Reading",
            checked: false,
        },
    ]
}

function initFilterText() {
    return ['Más usados', 'Más recientes', 'Más antiguos'];
}
