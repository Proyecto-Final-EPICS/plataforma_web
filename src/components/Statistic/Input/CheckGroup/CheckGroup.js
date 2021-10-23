import { useState, useEffect } from "react";
import { Checkbox, Space } from "antd";

export default function CheckGroup(props) {
    const {name, options, checked, update} = props;
    const [optionsChecked, setOptionsChecked] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);

    const onCheckOne = list => {
        if(list.length == options.length) onCheckAll(true);
        else {
            setOptionsChecked(list);
            setCheckedAll(false);
            update(name, list);
        }
    }

    const onCheckAll = checkOperation => {
        setCheckedAll(checkOperation);
        const temp = checkOperation ? options : [];
        setOptionsChecked(temp);
        update(name, temp);
    }

    useEffect(() => {
        onCheckOne(checked);
    }, []);

    return(
        <>
        <Checkbox.Group
            value={optionsChecked}
            onChange={onCheckOne}
        >
        <Space direction="vertical"
        // style={{zIndex: '100', position: 'absolute', height: '600px'}}
        >
            {options.map((op, index) => (
                <Checkbox value={op} key={index}>
                    {op}
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