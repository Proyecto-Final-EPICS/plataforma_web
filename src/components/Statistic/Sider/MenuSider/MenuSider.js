import {Menu} from 'antd';

import CheckGroup from '../../../General/Input/CheckGroup';
import RadioGroup from '../../../General/Input/RadioGroup';
import PeriodPicker from '../../../General/Input/PeriodPicker';

import './MenuSider.scss';

export default function MenuSider(props) {
    const {SubMenu} = Menu;
    const {paramOptions, query, updateParam} = props;

    const getPeriodDefParams = param => {
        const def = {};
        param.options.forEach(op => def[op.name] = query[op.name]);
        return def;
    }

    const getSelOptions = param => {
        switch(param.type) {
            case 'check':
                return query[param.name].map(q => {
                    const option = param.options.find(o => o.name === q);
                    return option && option.value;
                });
                break;
            case 'radio':
                const sel = param.options.find(o => o.name === query[param.name]);
                return sel && sel.value;
        }
        return null;
    }

	return (
        <Menu 
            className="statistics-sider-menu"
            mode="inline"
        >
            {paramOptions.map((param, i) => (
                <SubMenu 
                    className="statistics-sider-menu__sub"
                    title={param.title} 
                    icon={<param.icon/>} key={i}
                >
                    <div className="param">
                    {param.type === 'check' ?
                        <div className="padding-left">
                        <CheckGroup 
                            name={param.name}
                            options={param.options.map(op => op.value)}
                            checked={getSelOptions(param)}
                            update={updateParam}
                            dir='vertical'
                        />
                        </div>
                    :param.type === 'radio' ?
                        <div className="padding-left">
                        <RadioGroup 
                            name={param.name}
                            options={param.options.map(op => op.value)}
                            sel={getSelOptions(param)}
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
