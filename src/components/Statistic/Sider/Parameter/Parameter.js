//Librerías
import {useState, useEffect} from 'react';
import {Menu, Checkbox} from 'antd';

//Estilos
import './Parameter.scss';

export default function Parameter(props) {
    const {title, icon, options, all, inclusive, k, onChangeOption} = props;
    const key = k;
    
    const [selectedOptions, setSelectedOptions] = useState(initSelectedOptions);
    
    function initSelectedOptions() {
        const selectedOptions = {};
        for(let op in options) selectedOptions[op] = options[op].sel;
        
        return selectedOptions;
    }

    const DisplayIcon = (() => {
        if (all) return icon;

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

    const onCheckedOption = (op, sel) => {
        setSelectedOptions({
            ...selectedOptions,
            [op]: sel
        });
    }

    // return(
    //     <SubMenu key="sub1" icon={<UserOutlined />} title="User">
    //         <Menu.Item key="3">Tom</Menu.Item>
    //         <Menu.Item key="4">Bill</Menu.Item>
    //         <Menu.Item key="5">Alex</Menu.Item>
    //     </SubMenu>
    // )

    // useEffect(() => {
    //     initSelectedOptions();
    // }, []);

    return(
        <Menu.SubMenu className="parameter"
            {...props}
            key={key}
            title={title}
            icon={<DisplayIcon/>}
            
        >
            {Object.keys(options).map((op, index) => {
                // console.log('************************');
                // console.log(selectedOptions);
                // console.log(op);
                // console.log(selectedOptions[op]);
                // <Menu.Item
                //     // key={key+index}
                // >
                //     {options[op].title}
                // </Menu.Item>
                return(
                <div>
                    <Option className="parameter__option"
                        k={key+String(index)}
                        // sel={selectedOptions[op]?selectedOptions[op].sel:null}
                        sel={selectedOptions[op]}
                        name={String(op)}
                        title={options[op].title}
                        onCheckedOption={onCheckedOption}
                    />
                    <br/>
                </div>
                );
            })}
        </Menu.SubMenu>
    );
}

function Option(props) {
    const {sel, title, name, onCheckedOption, k} = props;
    const key=k
    // console.log(sel);
    // const [selected, setSelected] = useState(sel);
    
    const onChange = () => {
        // setSelected(!selected);
        onCheckedOption(name, !sel);
    }

    return(
        <Checkbox
                // {...props}
                key={key}
                defaultChecked={sel}
                checked={sel}
                onChange={onChange}
            >
                {title}
        </Checkbox>
    )
}