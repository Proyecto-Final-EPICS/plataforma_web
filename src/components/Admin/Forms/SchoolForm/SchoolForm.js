//Liberias
import { useEffect } from 'react';
import { Form, Input, Button, Row, Col, Cascader, InputNumber } from 'antd';

import locationApi from '../../../../mock_data/collections/location.json';

//Estilos
import './SchoolForm.scss';

export default function SchoolForm(props) {
    const { schools, setSchools, setModalVisible, edit, toEdit } = props;
    const [form] = Form.useForm();
    const resetFields = () => form.resetFields();
    const onFinishFailed = err => console.log(err);
    
    const onFinish = values => {
        const { code, name, location } = values;
        const school = {
            code, name, 
            location: {
                country: location[0],
                region: location[1],
                city: location[2],
            }
        };
        
        if(edit) {
            schools[schools.findIndex(c => c.code === toEdit.code)] = school;
            setSchools([...schools]);
        }else setSchools([...schools, school]);

        setModalVisible(false);
    };

    useEffect(() => {
        if(edit) {
            const { code, name, location: { country, depart, city } } = toEdit;
            form.setFieldsValue({code, name, country, depart, city});
        }
    }, []);

    return (
        <Form
            className="school-form"
            form={form}
            initialValues={{location: ['Colombia', 'Atlantico', 'Barranquilla']}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
        >
            <Row gutter={8}>
                <Col span={12}>
                    <Form.Item
                        name="code"
                        label="Código"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Nombre"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={8}>
                <Form.Item
                    name="location"
                    label="Ubicación"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Campo requerido',
                        }
                    ]}
                >
                    <Cascader 
                        options={locationApi}
                        onChange={e => console.log(e)}
                    />
                </Form.Item>
            </Row>

            <Row
                className='school-form__options'
                justify='center'
                gutter={8}
            >
                <Col className="school-form__options__reset">
                    <Form.Item>
                        <Button onClick={resetFields}>Limpiar campos</Button>
                    </Form.Item>
                </Col>

                <Col className="school-form__options__submit">
                    <Form.Item>
                        <Button htmlType="submit">{edit?"Actualizar":"Finalizar"}</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
