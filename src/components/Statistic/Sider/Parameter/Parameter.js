//Librerías
import {useState, useEffect} from 'react';
import {Collapse, Checkbox, Radio, Space} from 'antd';

//Estilos
import './Parameter.scss';

//...
import {TYPES} from '../../../../pages/Statistic/assets/defSiderStructure';

export default function Parameter(props) {
    const {title, type, siderCollapsed, k:key} = props;
    const [Icon, setIcon] = useState(null);

    return(
        <Collapse.Panel className="parameter"
            {...props}
            key={key}
            header={siderCollapsed ? null:title}
            // extra={<Icon/>}
        >
        {type==TYPES.CHECK_GROUP?
            <CheckGroup
                {...props}
                setIcon={setIcon}
            />
        :type==TYPES.RADIO_GROUP?
            <RadioGroup
                {...props}
                setIcon={setIcon}
            />
        :type==TYPES.RADIO_GROUP?
            <PeriodPicker
                {...props}
                setIcon={setIcon}
            />
        :null
        }
        </Collapse.Panel>
    );
}

function CheckGroup(props) {
    const {icon, options, onParameterModified, setIcon, k:key} = props;
    const optionNames = options.map(op => op.title);
    
    const [optionsChecked, setOptionsChecked] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);
    
    const initOptionsChecked = () => {
        // const list = [];
        // for(let op in options)
        //     if(options[op].sel) list.push(options[op].title);

        setOptionsChecked(optionNames.filter((_, index) => options[index].sel));
    }

    // const [selectedOptions, setSelectedOptions] = useState(initSelectedOptions);

    // function initSelectedOptions() {
    //     const selectedOptions = {};
    //     for(let op in options) selectedOptions[op] = options[op].sel;
        
    //     return selectedOptions;
    // }

    const DisplayIcon = (() => {
        if (options.every(op => op.sel)) return icon;

        let numSelOptions = 0;
        let lastIconOptionSel = null;
        
        for (let op in options) {
            if (options[op].sel){
                lastIconOptionSel = options[op].icon;
                numSelOptions += 1;
            }
        }
        
        if(numSelOptions == 0 || numSelOptions > 1) return icon;
        if(numSelOptions == 1) return lastIconOptionSel;
    })();

    setIcon(DisplayIcon);

    const onCheckOne = (list) => {
        if(list.length == optionNames.length) {
            onCheckAll(true);

        }else {
            setOptionsChecked(list);
            
            const sel = list.length > optionsChecked.length;
            
            let option = sel ?
                list.filter(op => !optionsChecked.includes(op))
            :
                optionsChecked.filter(op => !list.includes(op));
            option = options.findIndex(op => op.title == option);
            
            onParameterModified({
                param: key,
                option,
                sel,
            });
        }
    }

    const onCheckAll = (checkOperation) => {
        setOptionsChecked(checkOperation ? optionNames : []);
        setCheckedAll(checkOperation);
        onParameterModified({
            param: parseInt(key),
            checkOperation: checkOperation,
        });
    }

    useEffect(() => {
        initOptionsChecked();
        // setIcon(DisplayIcon);
    }, []);

    return(
        <>
        <Checkbox.Group
            options={optionNames} 
            value={optionsChecked}
            onChange={onCheckOne}
        />
        <Checkbox onChange={onCheckAll} checked={checkedAll}>
            All
        </Checkbox>
        </>
    )
}

function RadioGroup(props) {
    const [value, setValue] = useState(0);

    const {options, onParameterModified, setIcon, k:key} = props;
    const DisplayIcon = options[value].icon;
    
    const onCheck = (e) => {
        setValue(e.target.value);
        onParameterModified({
            param: parseInt(key),
            option: e.target.value
        });
    }

    const initialValue = () => {
        return Object.keys(options).findIndex(op => options[op].sel);
    }

    setIcon(DisplayIcon);

    useEffect(() => {
        setValue(initialValue());
        // setIcon(DisplayIcon);
    }, []);

    return(
    <Radio.Group onChange={onCheck} value={value}>
        <Space direction="vertical">
            {options.map((op, index) => (
                <Radio value={index}>{op.title}</Radio>
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