import {useState, useEffect} from 'react';
import {Menu} from 'antd';

export default function SiderMenu(props) {
	return (
		<>
		<div className="sider__logo">
		<div>
			{siderCollapsed?<SettingOutlined/>:'Parámetros'}
		</div>
		</div>

                <Collapse
                    className="sider__collapse"
                    expandIconPosition='right'
                    activeKey={activeParams}
                    onChange={onParamCollapse}
                >
                {Object.keys(siderStructure).map((param, index) => (
                    <Parameter
                        key={index}
                        k={index}
                        {...siderStructure[param]}
                        siderCollapsed={siderCollapsed}
                        onParameterModified={onParameterModified}
                    />
                ))}
		</Collapse>
		</>
	);
}
