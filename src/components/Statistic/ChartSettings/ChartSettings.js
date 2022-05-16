// import { useState } from "react";
import {Divider, Select, Form, Row, Col, Button} from 'antd';

import './ChartSettings.scss';

export default function ChartSettings(props) {
	const {type, setType, variable, setVariable, setIsModalVisible} = props;
	const [form] = Form.useForm();

	const onFinish = values => {
		setType(values.type || type);
		setVariable(values.variable || variable.name);
		setIsModalVisible(false);
	}

	const onFinishFailed = err => {
		console.log(err);
	}

	return (
		<div className="stats-settings">
			<h1>Configuración de la Gráfica</h1>
			<Divider/>
			<Form
				className="stats-form"
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				initialValues={{}}
				layout="vertical"
			>
			<Row gutter={20}>
				<Col span={12}>
				<Form.Item
                    name="type"
                    label="Tipo de Gráfico"
                    // required
                >
					<Select defaultValue={type}>
						<Select.Option value="line">Líneas</Select.Option>
						<Select.Option value="bar">Barras</Select.Option>
					</Select>
                </Form.Item>
				</Col>

				<Col span={12}>
				<Form.Item
                    name="variable"
                    label="Variable"
                    // required
                >
					<Select defaultValue={variable.name}>
						<Select.Option value="accuracy">Precisión</Select.Option>
						<Select.Option value="totTime">Tiempo Empleado</Select.Option>
					</Select>
                </Form.Item>
				</Col>
			</Row>

			<div className="stats-form__submit">
            <Form.Item>
                <Button 
					className='button-orange' 
					htmlType="submit" 
					type="primary"
				>
					Aplicar
				</Button>
            </Form.Item>
            </div>

			</Form>
			
				{/* <Dropdown
					key="1"
					onVisibleChange={flag => setTypeVisible(flag)}
					visible={typeVisible}
					overlay={
					<Menu
						onClick={(e) => {
							setTypeVisible(false);
							setTypeText(
								e.key === "1" ?
								"Gráfico de Líneas" : "Gráfico de Barras"
							)
						}}
					>
						<Menu.Item key="1">Gráfico de Líneas</Menu.Item>
						<Menu.Item key="2">Gráfico de Barras</Menu.Item>
					</Menu>}
				>
					<div>{typeText}{'   '}{<DownOutlined/>}</div>
				</Dropdown> */}
		</div>
	);
}