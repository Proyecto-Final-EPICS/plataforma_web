import {useState} from 'react';
import {Menu} from 'antd';

import CheckGroup from '../../../General/Input/CheckGroup';
import RadioGroup from '../../../General/Input/RadioGroup';
import PeriodPicker from '../../../General/Input/PeriodPicker';

const {SubMenu} = Menu;

export default function MenuSider(props) {
    const {parameters, defParams, updateParam} = props;

    const getPeriodDefParams = (param) => {
        const def = {};
        param.options.forEach(op => {
            def[op.name] = defParams[op.name];
        });
        return def;
    }
    
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
                    <div className="param">
                    {param.type === 'check' ?
                        <div className="padding-left">
                        <CheckGroup 
                            name={param.name}
                            options={param.options.map(op => op.value)}
                            checked={defParams[param.name]}
                            update={updateParam}
                        />
                        </div>
                    :param.type === 'radio' ?
                        <div className="padding-left">
                        <RadioGroup 
                            name={param.name}
                            options={param.options.map(op => op.value)}
                            sel={defParams[param.name]}
                            update={updateParam}
                        />
                        </div>
                    :param.type === 'period' ?
                        <div className="padding">
                        <PeriodPicker
                            name={param.name}
                            options={param.options.map(op => op.value)}
                            def={getPeriodDefParams(param)}
                            update={updateParam}
                        />
                        </div>
                    :null}
                    </div>
                </SubMenu>
            ))}
        </Menu>
	);
}
