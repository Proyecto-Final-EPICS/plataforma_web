import { useState } from "react";
import {Radio, Space} from 'antd';

export default function RadioGroup(props) {
    const {name, options, sel, update} = props;
    const [value, setValue] = useState(sel);

    const onSelect = e => {
        setValue(e.target.value);
        update(name, e.target.value);
    }

    return(
        <Radio.Group onChange={onSelect} value={value}>
        <Space direction="vertical">
            {options.map((op, index) => (
                <Radio value={op} key={index}>
                    {op}
                </Radio>
            ))}
        </Space>
        </Radio.Group>
    );
}
