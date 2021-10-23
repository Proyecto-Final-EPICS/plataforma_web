import {useState} from 'react';
import { useLocation } from 'react-router-dom';
import {Menu} from 'antd';
import qs from 'query-string';

// Íconos
import {
    UserOutlined,
    TeamOutlined, 
    EyeOutlined, 
    RocketOutlined,
} from '@ant-design/icons';

import CheckGroup from '../../Input/CheckGroup'; 
import RadioGroup from '../../Input/RadioGroup'; 

const {SubMenu} = Menu;

export default function MenuSider(props) {
    // const {collapsed, onCollapse} = props;
    const [paramSearch, setParamSearch] = useState({
        elem: 'est',
        app: ['op1', 'op2'],
        dis: ['op1', 'op2'],
        from: '',
        to: '',
    });

    const query = qs.parse(useLocation().search);

    const parameters = [
        {
            name: 'elem',
            type: 'radio',
            title: 'Elemento',
            options: [{name: 'est', value: 'Estudiantes'}, {name: 'cur', value: 'Cursos'}],
            icon: UserOutlined,
        },
        {
            name: 'app',
            type: 'check',
            title: 'Aplicaciones',
            options: [{name: 'op1', value: 'Op1'}, {name: 'op2', value: 'Op2'}],
            icon: RocketOutlined,
        },
        {
            name: 'dis',
            type: 'check',
            title: 'Discapacidad visual',
            options: [{name: 'op1', value: 'Op1'}, {name: 'op2', value: 'Op2'}],
            icon: EyeOutlined,
        },
    ];
    const updateParam = (name, config) => {
        const param = parameters.find(param => param.name === name);
        switch(param.type) {
            case 'radio':
                const op = param.options.find(op => op.value === config);
                setParamSearch({
                    ...paramSearch, 
                    [param.name]: op.name,
                });
                break;
            case 'check':
                const ops = param.options.filter((op, i) => op.value === config[i]);
                setParamSearch({
                    ...paramSearch, 
                    [param.name]: ops.map(op => op.name),
                });
                break;
        }
    }

    const getInitialValue = param => {
        switch(param.type) {
            case 'check':
                if(query[param.name]) {
                    const checked = typeof query[param.name] === 'object' ?
                        query[param.name] : [query[param.name]];
                    
                    return param.options.filter(op => checked.includes(op.name)).map(op => op.value);
                }else return [param.options[0].value];

            case 'radio':
                if(query[param.name]) {
                    let sel = query[param.name];
                    if(typeof sel === 'object') sel = sel[0];
    
                    sel = param.options.find(op => op.name === sel);
                    if(sel) return sel.value;
                }else return param.options[0].value;

                return '';
        }
        return [];
        
    }
    
	return (
        <Menu 
            className="menu"
            mode="inline"
        >
            {parameters.map((param, i) => (
                <SubMenu title={param.title} icon={<param.icon/>} key={i}>
                    {/* <Menu.Item> */}
                    <div>
                    {param.type === 'check' ?
                        <CheckGroup 
                            className="" 
                            name={param.name}
                            options={param.options.map(op => op.value)}
                            checked={getInitialValue(param)}
                            update={updateParam}
                        />
                    :param.type === 'radio' ?
                        <RadioGroup 
                            className="" 
                            name={param.name}
                            options={param.options.map(op => op.value)}
                            sel={getInitialValue(param)}
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
