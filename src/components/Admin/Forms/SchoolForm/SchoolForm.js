//Liberias
import { useEffect } from 'react';
import { Form, Input, Button, Row, Col, Cascader, Select } from 'antd';
import { BankOutlined, PhoneOutlined } from '@ant-design/icons';

import locationApi from '../../../../mock_data/collections/location.json';

//Estilos
import './SchoolForm.scss';
import { addSchool, editSchool, getSchools } from '../../../../api/school';

export default function SchoolForm(props) {
    const { Option } = Select;
    
    const { schools, setSchools, setModalVisible, edit, toEdit } = props;
    const [form] = Form.useForm();
    const resetFields = () => form.resetFields();
    const onFinishFailed = err => console.log(err);
    
    const SelectPhoneCountryCode = (
        <Form.Item name="phoneCountryCode" noStyle>
            <Select>
                <Option value="57">+57</Option>
                <Option value="58">+58</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = values => {
        const { id: id_school, name: school_name, location, phone: number, 
            phoneCountryCode: country_code } = values;
        const school = {
            id_school, school_name, 
            location: {
                country: location[0],
                region: location[1],
                city: location[2],
            },
            contact_phone: { number, country_code }
        };
        const updateSchools = () => getSchools().then(json => setSchools(json));
        
        if(edit) editSchool(toEdit.id_school, school).then(updateSchools);
        else addSchool(school).then(updateSchools);

        setModalVisible(false);
    };

    useEffect(() => {
        if(edit) {
            const { id_school: id, school_name: name, location: { country, depart, city }, 
            contact_phone: { number: phone, country_code: phone_country_code } } = toEdit;
            form.setFieldsValue({
                id, name, country, depart, city, phone, phone_country_code
            });
        }
    }, []);

    return (
        <Form
            className="school-form"
            form={form}
            initialValues={{
                location: ['Colombia', 'Atlantico', 'Barranquilla'],
                phoneCountryCode: '57'
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
        >
            <Row gutter={8}>
                <Col span={12}>
                    <Form.Item
                        name="id"
                        label="ID"
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
                        <Input prefix={<BankOutlined/>}/>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={8}>
                <Col span={14}>
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
                        <Cascader options={locationApi}/>
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name="phone"
                        label="Teléfono de Contacto"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Campo requerido',
                            }
                        ]}
                    >
                        <Input addonBefore={SelectPhoneCountryCode} prefix={<PhoneOutlined/>}/>
                    </Form.Item>
                </Col>
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
