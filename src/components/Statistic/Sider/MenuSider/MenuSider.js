import {useState} from 'react';
import {Menu} from 'antd';

import CheckGroup from '../../Input/CheckGroup'; 
import RadioGroup from '../../Input/RadioGroup'; 

const {SubMenu} = Menu;

export default function MenuSider(props) {
    const {parameters, defParams, updateParam} = props;
    
	return (
        <Menu 
            className="menu"
            mode="inline"
        >
            {parameters.map((param, i) => (
                <SubMenu 
                    className="menu__sub"
                    title={param.title} 
                    icon={<param.icon/>} key={i}
                >
                    {/* <Menu.Item> */}
                    <div className="param">
                    {param.type === 'check' ?
                        <CheckGroup 
                            name={param.name}
                            options={param.options.map(op => op.value)}
                            checked={defParams[param.name]}
                            update={updateParam}
                        />
                    :param.type === 'radio' ?
                        <RadioGroup 
                            name={param.name}
                            options={param.options.map(op => op.value)}
                            sel={defParams[param.name]}
                            update={updateParam}
                        />
                    :null}
                    </div>
                    
                    {/* </Menu.Item> */}
                </SubMenu>
            ))}
        </Menu>
	);
}
