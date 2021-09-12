//Librerías
import {useState, useEffect} from 'react';
import {Collapse, Checkbox, Radio, Space} from 'antd';

//Estilos
import './Parameter.scss';

//...
import {TYPES} from '../../../../pages/Statistic/assets/defSiderStructure';

export default function Parameter(props) {
    
    const {title, type, icon, options, siderCollapsed, k:key} = props;
    const [Icon, setIcon] = useState(null);
    
    const SelectIcon = () => {
        if(type == TYPES.CHECK_GROUP) {
            if(options.every(op => op.sel)) return icon;
            
            const optionsChecked = options.filter(op => op.sel);
            
            if(optionsChecked.length == 0 || optionsChecked.length > 1) return icon;
            return optionsChecked[0].icon;

        }else if(type == TYPES.RADIO_GROUP) {
            return options[options.findIndex(op => op.sel)].icon;
        
        }else if(type == TYPES.PERIOD_PICKER) {
            
        }
    }

    const onSelectOption = () => {
        setIcon(SelectIcon());
    }

    useEffect(() => {
        onSelectOption();
    }, []);
    
    return(
        <Collapse.Panel
            className="sider__collapse__parameter"
            {...props}
            // key={key}
            header={siderCollapsed ? null:title}
            extra={Icon?<Icon/>:null}
        >
        <div className="sider__collapse__parameter__options">
        {type==TYPES.CHECK_GROUP?
            <CheckGroup
                {...props}
                onSelectOption={onSelectOption}
            />
        :type==TYPES.RADIO_GROUP?
            <RadioGroup
                {...props}
                onSelectOption={onSelectOption}
            />
        :type==TYPES.RADIO_GROUP?
            <PeriodPicker
                {...props}
                onSelectOption={onSelectOption}
            />
        :null
        }
        </div>
        </Collapse.Panel>
    );
}

function CheckGroup(props) {
    const {options, onParameterModified, onSelectOption, k:key} = props;

    const optionIndexes = [...Array(options.length).keys()];
    
    const [optionsChecked, setOptionsChecked] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);
    
    const initOptionsChecked = () => {
        const temp = optionIndexes.filter(el => options[el].sel);
        setOptionsChecked(temp);
        if(temp.length == options.length) setCheckedAll(true);
    }

    const onCheckOne = (list) => {
        if(list.length == options.length) {
            onCheckAll(true);

        }else {
            list = list.map(el => parseInt(el));

            setCheckedAll(false);
            setOptionsChecked(list);
            
            const sel = list.length > optionsChecked.length;
            
            let option = sel ?
                list.filter(op => !optionsChecked.includes(op))
            :
                optionsChecked.filter(op => !list.includes(op));
            // option = options.findIndex(op => op.title == option);
            
            onParameterModified({
                param: key,
                option,
                sel,
            });
            onSelectOption();
        }
    }

    const onCheckAll = checkOperation => {
        
        setOptionsChecked(checkOperation ? optionIndexes : []);
        setCheckedAll(checkOperation);
        onParameterModified({
            param: key,
            checkOperation,
        });
        onSelectOption();
    }

    useEffect(() => {
        initOptionsChecked();
    }, []);

    return(
        <>
        <Checkbox.Group
            value={optionsChecked}
            onChange={onCheckOne}
        >
        <Space direction="vertical">
        {options.map((op, index) => (
            <Checkbox
                value={index} 
                key={index}
            >
                {op.title}
            </Checkbox>
        ))}
        </Space>
        </Checkbox.Group>
        <br/><br/>
        <Checkbox onChange={e => onCheckAll(e.target.checked)} checked={checkedAll}>
            All
        </Checkbox>
        </>
    )
}

function RadioGroup(props) {
    const [value, setValue] = useState(0);

    const {options, onParameterModified, onSelectOption, k:key} = props;
    
    const onCheck = e => {
        setValue(e.target.value);
        onParameterModified({
            param: key,
            option: e.target.value
        });
        onSelectOption();
    }

    const initialValue = () => {
        return Object.keys(options).findIndex(op => options[op].sel);
    }

    useEffect(() => {
        setValue(initialValue());
    }, []);

    return(
    <Radio.Group onChange={onCheck} value={value}>
    <Space direction="vertical">
    {options.map((op, index) => (
        <Radio value={index} key={index}>{op.title}</Radio>
    ))}
    </Space>
    </Radio.Group>
    );
}

function PeriodPicker(props) {
    return (
        <>
        
        </>
    );
}

// function Option(props) {
//     const {sel, title, name, onCheckedOption, inclusive, k} = props;
//     const key=k
//     // console.log(sel);
//     // const [selected, setSelected] = useState(sel);
    
//     const onChange = () => {
//         // setSelected(!selected);
//         onCheckedOption(name, !sel);
//     }

//     return(
//         inclusive?
//         <Checkbox
//                 // {...props}
//                 key={key}
//                 defaultChecked={sel}
//                 checked={sel}
//                 onChange={onChange}
//             >
//                 {title}
//         </Checkbox>
//         :
//         <Radio.Group>
//             <Space>
//                 <Radio value="">

//                 </Radio>
//             </Space>
//         </Radio.Group>
//     )
// }