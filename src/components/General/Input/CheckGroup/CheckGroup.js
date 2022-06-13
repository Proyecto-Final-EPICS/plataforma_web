import { useState, useEffect } from "react";
import { Checkbox, Space } from "antd";

export default function CheckGroup(props) {
    const { name, options, checked, update, dir } = props;
    const [optionsChecked, setOptionsChecked] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);

    const onCheckOne = list => {
        if(list.length == options.length) onCheckAll(true);
        else {
            setOptionsChecked(list);
            setCheckedAll(false);
            if(update) update(name, list);
        }
    }

    const onCheckAll = checkOperation => {
        setCheckedAll(checkOperation);
        const temp = checkOperation ? options : [];
        setOptionsChecked(temp);
        if(update) update(name, temp);
    }

    useEffect(() => onCheckOne(checked), []);

    return (
        <>
        {options.length ? <Space direction={dir}>
            <Checkbox.Group 
                className="check-group" 
                value={optionsChecked}
                onChange={onCheckOne}
            >
                <Space direction={dir}>
                {options.map((op, index) => (
                    <Checkbox 
                        className="check-group__item"
                        value={op} 
                        key={index} 
                    >
                        {op}
                    </Checkbox>
                ))}
                </Space>
            </Checkbox.Group>
            
            {options.length > 1 && <Checkbox 
                className="check-all" 
                onChange={e => onCheckAll(e.target.checked)} 
                checked={checkedAll}
            >
                Todos
            </Checkbox>}
        </Space> : null}
        </>
    )
}
