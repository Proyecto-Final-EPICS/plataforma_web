//Librerías
import {useState, useEffect} from 'react';
import {Collapse, Checkbox, Radio, Space} from 'antd';

//Estilos
import './Parameter.scss';

//...
import {TYPES} from '../../../../pages/Statistic/assets/defSiderStructure';

export default function Parameter(props) {
    return <></>;
    
    // const {title, type, icon, options, siderCollapsed, k:key} = props;
    // const [Icon, setIcon] = useState(null);
    
    // const SelectIcon = () => {
    //     if(type == TYPES.CHECK_GROUP) {
    //         if(options.every(op => op.sel)) return icon;
            
    //         const optionsChecked = options.filter(op => op.sel);
            
    //         if(optionsChecked.length == 0 || optionsChecked.length > 1) return icon;
    //         return optionsChecked[0].icon;

    //     }else if(type == TYPES.RADIO_GROUP) {
    //         return options[options.findIndex(op => op.sel)].icon;
        
    //     }else if(type == TYPES.PERIOD_PICKER) {
            
    //     }
    // }

    // const onSelectOption = () => {
    //     setIcon(SelectIcon());
    // }

    // useEffect(() => {
    //     onSelectOption();
    // }, []);
    
    // return(
    //     <Collapse.Panel
    //         className="sider__collapse__parameter"
    //         {...props}
    //         // key={key}
    //         header={siderCollapsed ? null:title}
    //         extra={Icon?<Icon/>:null}
    //     >
    //     <div className="sider__collapse__parameter__options">
    //     {type==TYPES.CHECK_GROUP?
    //         <CheckGroup
    //             {...props}
    //             onSelectOption={onSelectOption}
    //         />
    //     :type==TYPES.RADIO_GROUP?
    //         <RadioGroup
    //             {...props}
    //             onSelectOption={onSelectOption}
    //         />
    //     :type==TYPES.RADIO_GROUP?
    //         <PeriodPicker
    //             {...props}
    //             onSelectOption={onSelectOption}
    //         />
    //     :null
    //     }
    //     </div>
    //     </Collapse.Panel>
    // );
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