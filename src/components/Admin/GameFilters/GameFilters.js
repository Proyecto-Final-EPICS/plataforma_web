import {useState} from 'react';
import {Checkbox, Dropdown, Menu, Space} from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './GameFilters.scss';

export default function GameFilters(props) {

    const [categoryVisible, setCategoryVisible] = useState(false);
    const [category, setCategory] = useState(initCategory);
    const [levelVisible, setLevelVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterText, setFilterText] = useState('Más usados');

    const dropDownMenus = {
        category: {
            text: 'Categorías',
            icon: <DownOutlined/>,
            visible: categoryVisible,
            onVisibleChange: flag => setCategoryVisible(flag),
            menu: (
                <Menu>
                    {category.map((el, index) => (
                        <Menu.Item>
                        <Checkbox
                            key={index} 
                            checked={el.checked}
                            // onChange={setCategory([[...category], {}])}
                        >
                            {el.title}
                        </Checkbox>
                        </Menu.Item>
                    ))}
                    <br/>
                    <Menu.Item>
                    <Checkbox>Todos</Checkbox>
                    </Menu.Item>
                </Menu>
            ),
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

function initCategory() {
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